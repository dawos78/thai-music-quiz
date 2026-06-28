<template>
  <div class="glass-card-gold p-5 md:p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-amber-300 font-bold text-sm uppercase tracking-widest">
        {{ isComplete ? '✅ เครื่องดนตรีครบวง' : '🎵 เครื่องดนตรีในวง' }}
      </h2>
      <span class="text-amber-200/40 text-xs">
        {{ currentCount }} / {{ totalInstruments }} ชิ้น
      </span>
    </div>

    <!-- Description hint -->
    <p v-if="description" class="text-amber-200/50 text-xs mb-4 italic">
      💡 {{ description }}
    </p>

    <!-- Instruments grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <!-- Visible instruments -->
      <div
        v-for="(inst, index) in visibleInstruments"
        :key="'visible-' + index"
        class="instrument-slot visible animate-fade-in"
        :style="{ animationDelay: (index * 0.05) + 's' }"
      >
        <!-- Image container: always show emoji behind, image on top -->
        <div
          class="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden border relative"
          :style="{
            backgroundColor: getTypeColor(inst.type) + '15',
            borderColor: getTypeColor(inst.type) + '30',
          }"
        >
          <div class="absolute inset-0 flex items-center justify-center text-2xl z-0">
            {{ getEmoji(inst.type) }}
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
          <p class="text-amber-100 font-medium text-sm truncate">{{ inst.name }}</p>
          <p class="text-amber-200/40 text-xs">
            <span :style="{ color: getTypeColor(inst.type) }">{{ getLabel(inst.type) }}</span>
            {{ inst.quantity > 1 ? ' × ' + inst.quantity : '' }}
          </p>
        </div>
      </div>

      <!-- Hidden instrument slot -->
      <div
        v-if="hiddenInstrument && !showHidden"
        class="instrument-slot hidden-instrument"
      >
        <div class="w-12 h-12 rounded-xl bg-amber-500/10 flex-shrink-0 flex items-center justify-center border border-amber-500/30 border-dashed">
          <span class="text-amber-400 text-xl font-bold">?</span>
        </div>
        <div class="flex-1">
          <p class="text-amber-400 font-bold text-sm">เครื่องดนตรีที่หายไป</p>
          <p class="text-amber-200/40 text-xs">ทายให้ถูก!</p>
        </div>
      </div>

      <!-- Revealed instrument -->
      <div
        v-if="hiddenInstrument && showHidden"
        class="instrument-slot revealed"
      >
        <div class="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden border border-emerald-500/30 bg-emerald-500/10 relative">
          <div class="absolute inset-0 flex items-center justify-center text-2xl z-0">
            {{ getEmoji(hiddenInstrument.type) }}
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
          <p class="text-emerald-300 font-bold text-sm">{{ hiddenInstrument.name }}</p>
          <p class="text-emerald-200/50 text-xs">
            {{ getLabel(hiddenInstrument.type) }}
            {{ hiddenInstrument.quantity > 1 ? ' × ' + hiddenInstrument.quantity : '' }}
          </p>
        </div>
        <span class="text-emerald-400 text-lg">✓</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getInstrumentImage, getTypeLabel, getTypeColor as getTypeColorUtil, getTypeEmoji } from '../utils/instrumentImages'

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

function getImage(name) {
  return getInstrumentImage(name)
}

function getEmoji(type) {
  return getTypeEmoji(type)
}

function getLabel(type) {
  return getTypeLabel(type)
}

function getTypeColor(type) {
  return getTypeColorUtil(type)
}
</script>
