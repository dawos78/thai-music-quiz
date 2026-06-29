<template>
  <div class="min-h-screen overflow-y-auto">
    <!-- Top bar -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#e5e5ea]">
      <div class="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          @click="goToStart"
          class="flex items-center gap-1.5 text-[#86868b] hover:text-[#1d1d1f] transition-colors text-sm"
        >
          <Icon icon="mdi:arrow-left" class="w-4 h-4" />
          <span>กลับ</span>
        </button>

        <div class="flex items-center gap-4 text-sm">
          <div class="flex items-center gap-1">
            <Icon icon="mdi:star" class="w-4 h-4 text-amber-500" />
            <span class="font-semibold text-[#1d1d1f]">{{ totalScore }}</span>
          </div>
          <div class="flex items-center gap-1">
            <Icon icon="mdi:fire" class="w-4 h-4 text-orange-500" />
            <span class="font-medium text-[#1d1d1f]">{{ currentStreak }}</span>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium">
            {{ questionsAnswered + 1 }} / {{ totalQuestionCount }}
          </span>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="h-0.5 bg-[#f5f5f7]">
        <div
          class="h-full bg-[#1d1d1f] transition-all duration-500 ease-out"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-2xl mx-auto w-full px-4 py-6 pb-20">
      <!-- Loading -->
      <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <Icon icon="mdi:loading" class="w-8 h-8 text-[#86868b] animate-spin mx-auto mb-3" />
          <p class="text-[#86868b] text-sm">กำลังเตรียมชุดคำถาม...</p>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="flex items-center justify-center min-h-[60vh]">
        <div class="glass-card p-8 text-center">
          <Icon icon="mdi:alert-circle-outline" class="w-10 h-10 text-red-400 mx-auto mb-3" />
          <p class="text-red-600 mb-4">{{ error }}</p>
          <button @click="goToStart" class="btn-gold">กลับหน้าหลัก</button>
        </div>
      </div>

      <!-- Summary -->
      <div v-else-if="gameState === GAME_STATES.SUMMARY">
        <SummaryScreen />
      </div>

      <!-- Game -->
      <div v-else-if="currentQuestion" class="animate-fade-in">
        <!-- Category badge -->
        <div class="flex justify-center mb-6">
          <CategoryBadge
            :name="currentQuestion.categoryName"
            :color="currentQuestion.categoryColor"
          />
        </div>

        <!-- Step 1: Guess instrument -->
        <div v-if="gameState === GAME_STATES.GUESS_INSTRUMENT || gameState === GAME_STATES.INSTRUMENT_RESULT">
          <QuestionCard
            :visible-instruments="currentQuestion.visibleInstruments"
            :hidden-instrument="currentQuestion.hiddenInstrument"
            :total-instruments="currentQuestion.totalInstruments"
            :show-hidden="gameState === GAME_STATES.INSTRUMENT_RESULT"
            :description="currentQuestion.description"
          />

          <div class="mt-6" v-if="gameState === GAME_STATES.GUESS_INSTRUMENT">
            <h3 class="text-center text-[#86868b] text-xs font-medium mb-4 uppercase tracking-widest">
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

        <!-- Step 2: Guess ensemble -->
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
            <h3 class="text-center text-[#86868b] text-xs font-medium mb-4 uppercase tracking-widest">
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
</template>

<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useGame } from '../composables/useGame'
import CategoryBadge from './CategoryBadge.vue'
import QuestionCard from './QuestionCard.vue'
import AnswerPanel from './AnswerPanel.vue'
import ResultModal from './ResultModal.vue'
import SummaryScreen from './SummaryScreen.vue'

const {
  GAME_STATES, gameState, currentQuestion, isLoading, error,
  selectedInstrument, selectedEnsemble,
  instrumentCorrect, ensembleCorrect, instrumentResult, ensembleResult,
  totalScore, currentStreak, questionsAnswered, totalQuestionCount, progressPercent,
  loadNextQuestion, selectInstrument, submitInstrumentAnswer,
  selectEnsemble, submitEnsembleAnswer, goToStart,
} = useGame()
</script>
