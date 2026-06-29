<template>
  <div class="min-h-screen thai-pattern-bg text-white font-thai">
    <!-- Music toggle button -->
    <button
      @click="toggle"
      class="fixed bottom-4 right-4 z-50 w-8 h-8 rounded-full bg-[#2c2c2e]/80 backdrop-blur-sm flex items-center justify-center hover:bg-[#3a3a3c] transition-colors"
      :title="isPlaying ? 'ปิดเพลง' : 'เปิดเพลง'"
    >
      <Icon :icon="isPlaying ? 'mdi:volume-high' : 'mdi:volume-off'" class="w-4 h-4 text-[#98989d]" />
    </button>

    <StartScreen v-if="gameState === GAME_STATES.START" />
    <GameBoard v-else />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useGame } from './composables/useGame'
import { useMusic } from './composables/useMusic'
import StartScreen from './components/StartScreen.vue'
import GameBoard from './components/GameBoard.vue'

const { gameState, GAME_STATES } = useGame()
const { isPlaying, toggle } = useMusic()
</script>
