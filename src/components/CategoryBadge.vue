<template>
  <span class="inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-xl font-semibold bg-[#f5f5f7] border border-[#e5e5ea] text-[#1d1d1f]">
    <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: color }"></span>
    {{ name }}
  </span>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  color: { type: String, default: '#86868b' }
})
</script>
