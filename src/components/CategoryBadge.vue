<template>
  <span
    class="category-badge"
    :style="{
      backgroundColor: color + '15',
      borderColor: color + '40',
      color: color,
      border: '1px solid'
    }"
  >
    <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: color }"></span>
    {{ name }}
  </span>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  color: { type: String, default: '#C9A747' }
})
</script>
