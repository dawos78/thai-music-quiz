<template>
  <div class="min-h-screen thai-pattern-bg text-white font-thai">
    <StartScreen v-if="gameState === GAME_STATES.START" />
    <GameBoard v-else />
  </div>
</template>

<script setup>
import { useGame } from './composables/useGame'
import StartScreen from './components/StartScreen.vue'
import GameBoard from './components/GameBoard.vue'

const { gameState, GAME_STATES } = useGame()
</script>
