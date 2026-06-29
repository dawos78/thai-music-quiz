<template>
  <div class="animate-bounce-in">
    <div
      class="glass-card p-6 text-center"
      :class="correct
        ? 'border-green-200 bg-green-50'
        : 'border-red-200 bg-red-50'"
    >
      <!-- Icon -->
      <div class="flex justify-center mb-3">
        <div
          class="w-14 h-14 rounded-full flex items-center justify-center"
          :class="correct ? 'bg-green-100' : 'bg-red-100'"
        >
          <Icon
            :icon="correct ? 'mdi:check-circle' : 'mdi:close-circle'"
            class="w-8 h-8"
            :class="correct ? 'text-green-500' : 'text-red-500'"
          />
        </div>
      </div>

      <!-- Result text -->
      <h3 class="text-lg font-bold mb-1" :class="correct ? 'text-green-700' : 'text-red-700'">
        {{ correct ? 'ถูกต้อง!' : 'ไม่ถูกต้อง' }}
      </h3>

      <!-- Answer info -->
      <p class="text-sm mb-1 text-[#86868b]">
        {{ messagePrefix }}
      </p>
      <p class="text-base font-bold mb-2 text-[#1d1d1f]">
        {{ correctAnswer }}
      </p>

      <!-- If wrong -->
      <p v-if="!correct && selectedAnswer" class="text-red-400 text-xs mb-3">
        คุณตอบ: {{ selectedAnswer }}
      </p>

      <!-- Era info -->
      <p v-if="era && showNext" class="text-[#86868b] text-xs mb-4 flex items-center justify-center gap-1">
        <Icon icon="mdi:book-open-page-variant-outline" class="w-3.5 h-3.5" />
        {{ era }}
      </p>

      <!-- Score -->
      <div v-if="correct" class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
        <Icon icon="mdi:star" class="w-4 h-4" />
        <span>+{{ showNext ? '10' : '5' }} คะแนน</span>
      </div>

      <!-- Next button -->
      <div v-if="showNext" class="mt-4">
        <button @click="$emit('next')" class="btn-gold flex items-center justify-center gap-2 mx-auto">
          <span>{{ isLast ? 'ดูสรุปคะแนน' : 'ข้อถัดไป' }}</span>
          <Icon :icon="isLast ? 'mdi:chart-bar' : 'mdi:arrow-right'" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  correct: { type: Boolean, required: true },
  correctAnswer: { type: String, required: true },
  selectedAnswer: { type: String, default: null },
  messagePrefix: { type: String, default: '' },
  showNext: { type: Boolean, default: false },
  era: { type: String, default: '' },
  isLast: { type: Boolean, default: false },
})

defineEmits(['next'])
</script>
