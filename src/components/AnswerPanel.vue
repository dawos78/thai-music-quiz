<template>
  <div class="space-y-3">
    <button
      v-for="(choice, index) in choices"
      :key="index"
      @click="$emit('select', choice)"
      class="btn-choice group"
      :class="{
        'selected': selected === choice && !result,
        'correct': result && choice === result?.correctAnswer,
        'incorrect': result && selected === choice && choice !== result?.correctAnswer,
      }"
    >
      <div class="flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-amber-300/60 group-hover:text-amber-300 transition-colors flex-shrink-0">
          {{ ['ก', 'ข', 'ค', 'ง'][index] }}
        </span>
        <span class="flex-1">{{ choice }}</span>
        <span v-if="selected === choice && !result" class="text-amber-400 text-sm">●</span>
      </div>
    </button>

    <!-- Submit button -->
    <div class="pt-2" v-if="!result">
      <button
        @click="$emit('submit')"
        :disabled="!selected"
        class="btn-gold w-full disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
      >
        ยืนยันคำตอบ
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  choices: { type: Array, required: true },
  selected: { type: String, default: null },
  result: { type: Object, default: null },
})

defineEmits(['select', 'submit'])
</script>
