<template>
  <div class="animate-bounce-in">
    <div
      class="glass-card p-10 text-center"
      :class="correct
        ? 'border-green-800 bg-green-500/10'
        : 'border-red-800 bg-red-500/10'"
    >
      <!-- Icon -->
      <div class="flex justify-center mb-3">
        <div
          class="w-20 h-20 rounded-full flex items-center justify-center"
          :class="correct ? 'bg-green-500/20' : 'bg-red-500/20'"
        >
          <Icon
            :icon="correct ? 'mdi:check-circle' : 'mdi:close-circle'"
            class="w-12 h-12"
            :class="correct ? 'text-green-500' : 'text-red-500'"
          />
        </div>
      </div>

      <!-- Result text -->
      <h3 class="text-3xl font-bold mb-2" :class="correct ? 'text-green-400' : 'text-red-400'">
        {{ correct ? 'ถูกต้อง!' : 'ไม่ถูกต้อง' }}
      </h3>

      <!-- Answer info -->
      <p class="text-xl mb-2 text-[#98989d]">
        {{ messagePrefix }}
      </p>
      <p class="text-2xl font-bold mb-3 text-[#f5f5f7]">
        {{ correctAnswer }}
      </p>

      <!-- If wrong -->
      <p v-if="!correct && selectedAnswer" class="text-red-400 text-lg mb-4">
        คุณตอบ: {{ selectedAnswer }}
      </p>

      <!-- Era info -->
      <p v-if="era && showNext" class="text-[#98989d] text-base mb-6 flex items-center justify-center gap-2">
        <Icon icon="mdi:book-open-page-variant-outline" class="w-5 h-5" />
        {{ era }}
      </p>

      <!-- Score -->
      <div v-if="correct" class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/15 text-green-400 text-xl font-semibold mb-6">
        <Icon icon="mdi:star" class="w-6 h-6" />
        <span>+{{ showNext ? '10' : '5' }} คะแนน</span>
      </div>

      <!-- Next button -->
      <div v-if="showNext" class="mt-4">
        <button @click="$emit('next')" class="btn-gold flex items-center justify-center gap-2 mx-auto">
          <span>{{ isLast ? 'ดูสรุปคะแนน' : 'ข้อถัดไป' }}</span>
          <Icon :icon="isLast ? 'mdi:chart-bar' : 'mdi:arrow-right'" class="w-7 h-7" />
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
