<template>
  <div class="animate-bounce-in">
    <div
      class="glass-card p-6 text-center border"
      :class="correct
        ? 'border-emerald-500/30 bg-emerald-500/5'
        : 'border-red-500/30 bg-red-500/5'"
    >
      <!-- Icon -->
      <div class="text-5xl mb-3">
        {{ correct ? '🎉' : '😢' }}
      </div>

      <!-- Result text -->
      <h3 class="text-xl font-bold mb-2" :class="correct ? 'text-emerald-300' : 'text-red-300'">
        {{ correct ? 'ถูกต้อง!' : 'ไม่ถูกต้อง' }}
      </h3>

      <!-- Answer info -->
      <p class="text-sm mb-1" :class="correct ? 'text-emerald-200/70' : 'text-red-200/70'">
        {{ messagePrefix }}
      </p>
      <p class="text-lg font-bold mb-2" :class="correct ? 'text-emerald-200' : 'text-amber-300'">
        « {{ correctAnswer }} »
      </p>

      <!-- If wrong, show what they picked -->
      <p v-if="!correct && selectedAnswer" class="text-red-300/60 text-xs mb-3">
        คุณตอบ: {{ selectedAnswer }}
      </p>

      <!-- Era info if available -->
      <p v-if="era && showNext" class="text-amber-200/40 text-xs mb-4">
        📜 {{ era }}
      </p>

      <!-- Score indicator -->
      <div v-if="correct" class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm mb-4">
        <span>+{{ showNext ? '10' : '5' }}</span>
        <span>คะแนน</span>
      </div>

      <!-- Next button -->
      <div v-if="showNext" class="mt-4">
        <button @click="$emit('next')" class="btn-gold">
          {{ isLast ? 'ดูสรุปคะแนน 📊' : 'ข้อถัดไป →' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
