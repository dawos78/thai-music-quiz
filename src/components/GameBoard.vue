<template>
  <div class="min-h-screen overflow-y-auto">
    <!-- Top bar -->
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/5">
      <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          @click="goToStart"
          class="flex items-center gap-2 text-amber-300/70 hover:text-amber-300 transition-colors text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>กลับหน้าหลัก</span>
        </button>

        <!-- Score + Progress -->
        <div class="flex items-center gap-4 text-sm">
          <div class="flex items-center gap-1.5">
            <span class="text-amber-400">⭐</span>
            <span class="text-amber-200 font-bold">{{ totalScore }}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="text-orange-400">🔥</span>
            <span class="text-amber-200 font-medium">{{ currentStreak }}</span>
          </div>
          <div class="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
            {{ questionsAnswered + 1 }} / {{ totalQuestionCount }}
          </div>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="h-1 bg-white/5">
        <div
          class="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 ease-out"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>
    </header>

    <!-- Main content area -->
    <main class="max-w-4xl mx-auto w-full px-4 py-6 pb-20">
      <!-- Loading state -->
      <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <div class="text-5xl animate-bounce mb-4">🎵</div>
          <p class="text-amber-200/60 animate-pulse">กำลังเตรียมชุดคำถาม...</p>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="flex items-center justify-center min-h-[60vh]">
        <div class="glass-card p-8 text-center">
          <div class="text-4xl mb-4">😵</div>
          <p class="text-red-300 mb-4">{{ error }}</p>
          <button @click="goToStart" class="btn-gold">กลับหน้าหลัก</button>
        </div>
      </div>

      <!-- Summary page -->
      <div v-else-if="gameState === GAME_STATES.SUMMARY">
        <SummaryScreen />
      </div>

      <!-- Game content -->
      <div v-else-if="currentQuestion" class="animate-fade-in">
        <!-- Category badge -->
        <div class="flex justify-center mb-6">
          <CategoryBadge
            :name="currentQuestion.categoryName"
            :color="currentQuestion.categoryColor"
          />
        </div>

        <!-- Step 1: Guess the missing instrument -->
        <div v-if="gameState === GAME_STATES.GUESS_INSTRUMENT || gameState === GAME_STATES.INSTRUMENT_RESULT">
          <QuestionCard
            :visible-instruments="currentQuestion.visibleInstruments"
            :hidden-instrument="currentQuestion.hiddenInstrument"
            :total-instruments="currentQuestion.totalInstruments"
            :show-hidden="gameState === GAME_STATES.INSTRUMENT_RESULT"
            :description="currentQuestion.description"
          />

          <div class="mt-6" v-if="gameState === GAME_STATES.GUESS_INSTRUMENT">
            <h3 class="text-center text-amber-200/80 text-sm font-medium mb-4 uppercase tracking-widest">
              เครื่องดนตรีที่หายไปคือ?
            </h3>
            <AnswerPanel
              :choices="currentQuestion.instrumentChoices"
              :selected="selectedInstrument"
              :result="null"
              @select="selectInstrument"
              @submit="submitInstrumentAnswer"
            />
          </div>

          <div v-if="gameState === GAME_STATES.INSTRUMENT_RESULT" class="mt-6">
            <ResultModal
              :correct="instrumentCorrect"
              :correct-answer="currentQuestion.hiddenInstrument.name"
              :selected-answer="instrumentResult?.selectedAnswer"
              message-prefix="เครื่องดนตรีที่หายไปคือ"
              :show-next="false"
            />
          </div>
        </div>

        <!-- Step 2: Guess the ensemble type -->
        <div v-if="gameState === GAME_STATES.GUESS_ENSEMBLE || gameState === GAME_STATES.ENSEMBLE_RESULT">
          <QuestionCard
            :visible-instruments="[...currentQuestion.visibleInstruments, currentQuestion.hiddenInstrument]"
            :hidden-instrument="null"
            :total-instruments="currentQuestion.totalInstruments"
            :show-hidden="false"
            :description="currentQuestion.description"
            :is-complete="true"
          />

          <div class="mt-6" v-if="gameState === GAME_STATES.GUESS_ENSEMBLE">
            <h3 class="text-center text-amber-200/80 text-sm font-medium mb-4 uppercase tracking-widest">
              เครื่องดนตรีครบแล้ว! นี่คือวงอะไร?
            </h3>
            <AnswerPanel
              :choices="currentQuestion.ensembleChoices"
              :selected="selectedEnsemble"
              :result="null"
              @select="selectEnsemble"
              @submit="submitEnsembleAnswer"
            />
          </div>

          <div v-if="gameState === GAME_STATES.ENSEMBLE_RESULT" class="mt-6">
            <ResultModal
              :correct="ensembleCorrect"
              :correct-answer="currentQuestion.ensembleName"
              :selected-answer="ensembleResult?.selectedAnswer"
              message-prefix="วงดนตรีนี้คือ"
              :show-next="true"
              :era="currentQuestion.era"
              :is-last="questionsAnswered + 1 >= totalQuestionCount"
              @next="loadNextQuestion"
            />
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Confetti overlay -->
  <div v-if="showConfetti" class="fixed inset-0 pointer-events-none z-[100]">
    <div v-for="i in 30" :key="i"
      class="absolute animate-confetti"
      :style="{
        left: Math.random() * 100 + '%',
        animationDelay: Math.random() * 1 + 's',
        animationDuration: (1 + Math.random() * 2) + 's',
      }"
    >
      <div
        class="w-3 h-3 rounded-sm"
        :style="{
          background: ['#C9A747', '#FFD700', '#FF6B6B', '#4ECDC4', '#A747C9', '#47C9A7'][i % 6],
          transform: 'rotate(' + (Math.random() * 360) + 'deg)',
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useGame } from '../composables/useGame'
import CategoryBadge from './CategoryBadge.vue'
import QuestionCard from './QuestionCard.vue'
import AnswerPanel from './AnswerPanel.vue'
import ResultModal from './ResultModal.vue'
import SummaryScreen from './SummaryScreen.vue'

const {
  GAME_STATES,
  gameState,
  currentQuestion,
  isLoading,
  error,
  selectedInstrument,
  selectedEnsemble,
  instrumentCorrect,
  ensembleCorrect,
  instrumentResult,
  ensembleResult,
  totalScore,
  currentStreak,
  questionsAnswered,
  totalQuestionCount,
  progressPercent,
  loadNextQuestion,
  selectInstrument,
  submitInstrumentAnswer,
  selectEnsemble,
  submitEnsembleAnswer,
  goToStart,
} = useGame()

const showConfetti = ref(false)

watch(gameState, (newState) => {
  if (newState === GAME_STATES.ENSEMBLE_RESULT && ensembleCorrect.value && instrumentCorrect.value) {
    showConfetti.value = true
    setTimeout(() => {
      showConfetti.value = false
    }, 3000)
  }
})
</script>
