<template>
  <div class="min-h-screen thai-pattern-bg text-white font-thai">
    <!-- Music toggle button -->
    <button
      @click="toggle"
      class="fixed bottom-5 right-5 z-50 w-10 h-10 rounded-full bg-[#2c2c2e] border border-[#3a3a3c] flex items-center justify-center hover:bg-[#3a3a3c] transition-colors"
      :title="isPlaying ? 'ปิดเพลง' : 'เปิดเพลง'"
    >
      <Icon :icon="isPlaying ? 'mdi:volume-high' : 'mdi:volume-off'" class="w-5 h-5 text-[#98989d]" />
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
