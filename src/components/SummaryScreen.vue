<template>
  <div class="animate-slide-up">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="flex justify-center mb-4">
        <div class="w-24 h-24 rounded-full flex items-center justify-center" :class="trophyBg">
          <Icon :icon="trophyIcon" class="w-12 h-12" :class="trophyColor" />
        </div>
      </div>
      <h1 class="text-4xl font-extrabold text-[#f5f5f7] mb-2">สรุปคะแนน</h1>
      <p class="text-[#98989d] text-xl">ตอบครบ {{ totalQuestionCount }} ข้อแล้ว!</p>
    </div>

    <!-- Score card -->
    <div class="glass-card-gold p-8 mb-6 text-center">
      <div class="text-6xl font-extrabold text-[#f5f5f7] mb-2">{{ totalScore }}</div>
      <p class="text-[#98989d] text-xl mb-6">คะแนนรวม (จากทั้งหมด {{ maxPossibleScore }})</p>

      <div class="grid grid-cols-3 gap-4 mt-6">
        <div class="bg-green-50 rounded-xl p-3">
          <div class="text-3xl font-bold text-green-600">{{ correctBoth }}</div>
          <div class="text-base text-[#98989d] mt-1">ถูกทั้งคู่</div>
        </div>
        <div class="bg-blue-50 rounded-xl p-3">
          <div class="text-3xl font-bold text-blue-600">{{ correctInstrument }}</div>
          <div class="text-base text-[#98989d] mt-1">ทายเครื่องถูก</div>
        </div>
        <div class="bg-orange-50 rounded-xl p-3">
          <div class="text-3xl font-bold text-orange-600">{{ maxStreak }}</div>
          <div class="text-base text-[#98989d] mt-1">ถูกติดต่อกัน</div>
        </div>
      </div>
    </div>

    <!-- Accuracy bar -->
    <div class="glass-card p-6 mb-6">
      <div class="flex justify-between text-lg mb-3">
        <span class="text-[#98989d]">ความแม่นยำ</span>
        <span class="text-[#f5f5f7] font-bold">{{ accuracyPercent }}%</span>
      </div>
      <div class="h-3 rounded-full bg-[#2c2c2e] overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-1000 ease-out"
          :class="accuracyPercent >= 80 ? 'bg-green-500' : accuracyPercent >= 50 ? 'bg-amber-500' : 'bg-red-500'"
          :style="{ width: accuracyPercent + '%' }"
        ></div>
      </div>
    </div>

    <!-- Answer details -->
    <div class="glass-card p-6 mb-6">
      <h3 class="text-[#f5f5f7] font-semibold text-xl mb-4 flex items-center gap-3">
        <Icon icon="mdi:clipboard-text-outline" class="w-6 h-6 text-[#98989d]" />
        รายละเอียดแต่ละข้อ
      </h3>
      <div class="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        <div
          v-for="(ans, i) in answersHistory"
          :key="i"
          class="flex items-center gap-4 px-4 py-3 rounded-xl text-lg"
          :class="ans.bothCorrect ? 'bg-green-500/10' : 'bg-red-500/10'"
        >
          <span class="w-8 h-8 rounded-full flex items-center justify-center text-base font-semibold flex-shrink-0"
            :class="ans.bothCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'"
          >
            {{ i + 1 }}
          </span>
          <span class="flex-1 truncate text-[#f5f5f7]">
            {{ ans.ensembleName }}
          </span>
          <div class="flex gap-2 flex-shrink-0">
            <span class="text-base px-2.5 py-1 rounded font-medium"
              :class="ans.instrumentCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'"
            >
              <Icon :icon="ans.instrumentCorrect ? 'mdi:check' : 'mdi:close'" class="w-4 h-4 inline" /> เครื่อง
            </span>
            <span class="text-base px-2.5 py-1 rounded font-medium"
              :class="ans.ensembleCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'"
            >
              <Icon :icon="ans.ensembleCorrect ? 'mdi:check' : 'mdi:close'" class="w-4 h-4 inline" /> วง
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex flex-col sm:flex-row gap-4">
      <button @click="startGame(null)" class="btn-gold flex-1 text-center flex items-center justify-center gap-2">
        <Icon icon="mdi:refresh" class="w-7 h-7" />
        เล่นใหม่
      </button>
      <button @click="goToStart" class="btn-choice flex-1 text-center !py-4 flex items-center justify-center gap-2">
        <Icon icon="mdi:home-outline" class="w-7 h-7 text-[#98989d]" />
        กลับหน้าหลัก
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
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

const trophyIcon = computed(() => {
  const pct = accuracyPercent.value
  if (pct >= 90) return 'mdi:trophy'
  if (pct >= 70) return 'mdi:medal'
  if (pct >= 50) return 'mdi:star-circle'
  return 'mdi:book-open-variant'
})

const trophyColor = computed(() => {
  const pct = accuracyPercent.value
  if (pct >= 90) return 'text-amber-500'
  if (pct >= 70) return 'text-gray-400'
  if (pct >= 50) return 'text-orange-400'
  return 'text-blue-400'
})

const trophyBg = computed(() => {
  const pct = accuracyPercent.value
  if (pct >= 90) return 'bg-amber-50'
  if (pct >= 70) return 'bg-gray-50'
  if (pct >= 50) return 'bg-orange-50'
  return 'bg-blue-50'
})
</script>
