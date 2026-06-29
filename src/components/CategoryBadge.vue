<template>
  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-[#f5f5f7] border border-[#e5e5ea] text-[#1d1d1f]">
    <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: color }"></span>
    {{ name }}
  </span>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  color: { type: String, default: '#86868b' }
})
</script>
