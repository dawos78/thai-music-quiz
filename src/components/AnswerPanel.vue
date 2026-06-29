<template>
  <div class="space-y-2.5">
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
        <span class="w-7 h-7 rounded-lg bg-[#2c2c2e] flex items-center justify-center text-xs font-semibold text-[#98989d] group-hover:text-[#f5f5f7] transition-colors flex-shrink-0">
          {{ ['ก', 'ข', 'ค', 'ง'][index] }}
        </span>
        <span class="flex-1 text-[#f5f5f7]">{{ choice }}</span>
        <span v-if="selected === choice && !result" class="text-[#5856d6] text-sm">●</span>
      </div>
    </button>

    <div class="pt-2" v-if="!result">
      <button
        @click="$emit('submit')"
        :disabled="!selected"
        class="btn-gold w-full disabled:opacity-30 disabled:cursor-not-allowed"
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
