<template>
  <div class="animate-slide-up">
    <!-- Trophy / Header -->
    <div class="text-center mb-8">
      <div class="text-7xl mb-4">{{ trophy }}</div>
      <h1 class="text-3xl font-black text-gradient-gold mb-2">สรุปคะแนน</h1>
      <p class="text-amber-200/50 text-sm">ตอบครบ {{ totalQuestionCount }} ข้อแล้ว!</p>
    </div>

    <!-- Score card -->
    <div class="glass-card-gold p-6 mb-6 text-center">
      <div class="text-5xl font-black text-gradient-gold mb-2">{{ totalScore }}</div>
      <p class="text-amber-200/60 text-sm mb-4">คะแนนรวม (จากทั้งหมด {{ maxPossibleScore }})</p>

      <!-- Stats grid -->
      <div class="grid grid-cols-3 gap-4 mt-4">
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-2xl font-bold text-emerald-400">{{ correctBoth }}</div>
          <div class="text-xs text-amber-200/40 mt-1">ถูกทั้งคู่</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-2xl font-bold text-amber-400">{{ correctInstrument }}</div>
          <div class="text-xs text-amber-200/40 mt-1">ทายเครื่องถูก</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-2xl font-bold text-orange-400">{{ maxStreak }}</div>
          <div class="text-xs text-amber-200/40 mt-1">ตอบถูกติดต่อกัน</div>
        </div>
      </div>
    </div>

    <!-- Accuracy bar -->
    <div class="glass-card p-4 mb-6">
      <div class="flex justify-between text-sm mb-2">
        <span class="text-amber-200/60">ความแม่นยำ</span>
        <span class="text-amber-300 font-bold">{{ accuracyPercent }}%</span>
      </div>
      <div class="h-3 rounded-full bg-white/5 overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-1000 ease-out"
          :class="accuracyPercent >= 80 ? 'bg-emerald-500' : accuracyPercent >= 50 ? 'bg-amber-500' : 'bg-red-500'"
          :style="{ width: accuracyPercent + '%' }"
        ></div>
      </div>
    </div>

    <!-- Answer details -->
    <div class="glass-card p-4 mb-6">
      <h3 class="text-amber-300 font-bold text-sm mb-3 uppercase tracking-widest">📋 รายละเอียดแต่ละข้อ</h3>
      <div class="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        <div
          v-for="(ans, i) in answersHistory"
          :key="i"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm"
          :class="ans.bothCorrect ? 'bg-emerald-500/10' : 'bg-red-500/10'"
        >
          <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            :class="ans.bothCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'"
          >
            {{ i + 1 }}
          </span>
          <span class="flex-1 truncate" :class="ans.bothCorrect ? 'text-emerald-200' : 'text-red-200'">
            {{ ans.ensembleName }}
          </span>
          <div class="flex gap-1 flex-shrink-0">
            <span class="text-xs px-1.5 py-0.5 rounded"
              :class="ans.instrumentCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'"
            >
              {{ ans.instrumentCorrect ? '✓' : '✗' }} เครื่อง
            </span>
            <span class="text-xs px-1.5 py-0.5 rounded"
              :class="ans.ensembleCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'"
            >
              {{ ans.ensembleCorrect ? '✓' : '✗' }} วง
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex flex-col sm:flex-row gap-3">
      <button @click="startGame(null)" class="btn-gold flex-1 text-center">
        🔄 เล่นใหม่ (สุ่มทุกประเภท)
      </button>
      <button @click="goToStart" class="btn-choice flex-1 text-center !py-4">
        🏠 กลับหน้าหลัก
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGame } from '../composables/useGame'

const {
  totalScore,
  maxStreak,
  totalQuestionCount,
  answersHistory,
  startGame,
  goToStart
} = useGame()

const maxPossibleScore = computed(() => totalQuestionCount.value * 15)
const correctBoth = computed(() => answersHistory.value.filter(a => a.bothCorrect).length)
const correctInstrument = computed(() => answersHistory.value.filter(a => a.instrumentCorrect).length)
const accuracyPercent = computed(() => {
  if (totalQuestionCount.value === 0) return 0
  return Math.round((correctBoth.value / totalQuestionCount.value) * 100)
})

const trophy = computed(() => {
  const pct = accuracyPercent.value
  if (pct >= 90) return '🏆'
  if (pct >= 70) return '🥈'
  if (pct >= 50) return '🥉'
  return '📚'
})
</script>
