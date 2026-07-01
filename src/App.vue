<template>
  <!-- Music toggle button — outside main container -->
  <button
    @click="toggle"
    class="fixed bottom-3 right-3 z-[9999] w-9 h-9 rounded-full bg-[#2c2c2e] border border-[#3a3a3c] flex items-center justify-center hover:bg-[#3a3a3c] transition-colors shadow-lg"
    :title="isPlaying ? 'ปิดเพลง' : 'เปิดเพลง'"
  >
    <Icon :icon="isPlaying ? 'mdi:volume-high' : 'mdi:volume-off'" class="w-4 h-4 text-[#f5f5f7]" />
  </button>

  <div class="min-h-screen thai-pattern-bg text-white font-thai">
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
