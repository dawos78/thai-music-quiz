<template>
  <div class="glass-card-gold p-5 md:p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[#1d1d1f] font-semibold text-sm flex items-center gap-2">
        <Icon :icon="isComplete ? 'mdi:check-circle' : 'mdi:music-note'" class="w-4 h-4" :class="isComplete ? 'text-green-500' : 'text-[#86868b]'" />
        {{ isComplete ? 'เครื่องดนตรีครบวง' : 'เครื่องดนตรีในวง' }}
      </h2>
      <span class="text-[#86868b] text-xs">
        {{ currentCount }} / {{ totalInstruments }} ชิ้น
      </span>
    </div>

    <!-- Description -->
    <p v-if="description" class="text-[#86868b] text-xs mb-4">
      {{ description }}
    </p>

    <!-- Instruments grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      <!-- Visible instruments -->
      <div
        v-for="(inst, index) in visibleInstruments"
        :key="'visible-' + index"
        class="instrument-slot visible animate-fade-in"
        :style="{ animationDelay: (index * 0.03) + 's' }"
      >
        <div class="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden bg-[#f5f5f7] relative">
          <div class="absolute inset-0 flex items-center justify-center">
            <Icon :icon="getTypeIcon(inst.type)" class="w-5 h-5 text-[#86868b]" />
          </div>
          <img
            v-if="getImage(inst.name)"
            :src="getImage(inst.name)"
            :alt="inst.name"
            class="absolute inset-0 w-full h-full object-cover z-10"
            loading="lazy"
          />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-[#1d1d1f] font-medium text-sm truncate">{{ inst.name }}</p>
          <p class="text-[#86868b] text-xs">
            {{ getLabel(inst.type) }}
            {{ inst.quantity > 1 ? ' × ' + inst.quantity : '' }}
          </p>
        </div>
      </div>

      <!-- Hidden slot -->
      <div v-if="hiddenInstrument && !showHidden" class="instrument-slot hidden-instrument">
        <div class="w-10 h-10 rounded-lg bg-amber-50 flex-shrink-0 flex items-center justify-center">
          <Icon icon="mdi:help" class="w-5 h-5 text-amber-500" />
        </div>
        <div class="flex-1">
          <p class="text-amber-700 font-medium text-sm">เครื่องดนตรีที่หายไป</p>
          <p class="text-amber-500 text-xs">ทายให้ถูก!</p>
        </div>
      </div>

      <!-- Revealed -->
      <div v-if="hiddenInstrument && showHidden" class="instrument-slot revealed">
        <div class="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden bg-green-50 relative">
          <div class="absolute inset-0 flex items-center justify-center">
            <Icon :icon="getTypeIcon(hiddenInstrument.type)" class="w-5 h-5 text-green-500" />
          </div>
          <img
            v-if="getImage(hiddenInstrument.name)"
            :src="getImage(hiddenInstrument.name)"
            :alt="hiddenInstrument.name"
            class="absolute inset-0 w-full h-full object-cover z-10"
            loading="lazy"
          />
        </div>
        <div class="flex-1">
          <p class="text-green-700 font-medium text-sm">{{ hiddenInstrument.name }}</p>
          <p class="text-green-500 text-xs">
            {{ getLabel(hiddenInstrument.type) }}
            {{ hiddenInstrument.quantity > 1 ? ' × ' + hiddenInstrument.quantity : '' }}
          </p>
        </div>
        <Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { getInstrumentImage, getTypeLabel } from '../utils/instrumentImages'

const props = defineProps({
  visibleInstruments: { type: Array, required: true },
  hiddenInstrument: { type: Object, default: null },
  totalInstruments: { type: Number, required: true },
  showHidden: { type: Boolean, default: false },
  description: { type: String, default: '' },
  isComplete: { type: Boolean, default: false }
})

const currentCount = computed(() => {
  let count = props.visibleInstruments.length
  if (props.showHidden && props.hiddenInstrument) count++
  if (props.isComplete) count = props.visibleInstruments.length
  return count
})

const typeIconMap = {
  'เป่า': 'game-icons:pan-flute',
  'ตี': 'game-icons:drum',
  'สี': 'game-icons:violin',
  'ดีด': 'game-icons:harp',
}

function getImage(name) { return getInstrumentImage(name) }
function getLabel(type) { return getTypeLabel(type) }
function getTypeIcon(type) { return typeIconMap[type] || 'mdi:music-note' }
</script>
