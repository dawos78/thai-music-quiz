<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
    <!-- Subtle background decorations -->
    <div class="absolute top-20 left-10 opacity-[0.04]">
      <Icon icon="game-icons:xylophone" class="w-20 h-20 text-amber-800" />
    </div>
    <div class="absolute top-40 right-16 opacity-[0.04]" style="animation-delay: 1s;">
      <Icon icon="game-icons:gong" class="w-16 h-16 text-amber-800" />
    </div>
    <div class="absolute bottom-32 left-20 opacity-[0.04]" style="animation-delay: 2s;">
      <Icon icon="game-icons:violin" class="w-14 h-14 text-amber-800" />
    </div>

    <!-- Main content -->
    <div class="text-center animate-slide-up max-w-xl w-full">
      <!-- Logo -->
      <div class="mb-4 flex justify-center">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center shadow-lg">
          <Icon icon="game-icons:musical-notes" class="w-9 h-9 text-amber-100" />
        </div>
      </div>
      <h1 class="text-4xl md:text-5xl font-black mb-2 text-gradient-gold leading-tight">
        ทายวงดนตรีไทย
      </h1>
      <p class="text-amber-800/50 text-base mb-8">
        ทดสอบความรู้เรื่องเครื่องดนตรีและวงดนตรีไทย
      </p>

      <div class="thai-deco-line mb-8"></div>

      <!-- How to play -->
      <div class="glass-card-gold p-6 mb-8 text-left">
        <h2 class="text-lg font-bold text-amber-900 mb-4 text-center flex items-center justify-center gap-2">
          <Icon icon="mdi:gamepad-variant-outline" class="w-5 h-5" />
          วิธีเล่น
        </h2>
        <div class="space-y-3">
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-7 h-7 rounded-full bg-amber-800/10 flex items-center justify-center text-xs font-bold text-amber-800">1</span>
            <p class="text-amber-900/70 text-sm pt-0.5">เครื่องดนตรีในวงจะแสดงขึ้นมา แต่จะมี<span class="text-amber-900 font-semibold">บางชิ้นหายไป</span></p>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-7 h-7 rounded-full bg-amber-800/10 flex items-center justify-center text-xs font-bold text-amber-800">2</span>
            <p class="text-amber-900/70 text-sm pt-0.5">ทายว่าเครื่องดนตรีที่หายไปคือ<span class="text-amber-900 font-semibold">เครื่องดนตรีอะไร</span></p>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-7 h-7 rounded-full bg-amber-800/10 flex items-center justify-center text-xs font-bold text-amber-800">3</span>
            <p class="text-amber-900/70 text-sm pt-0.5">เมื่อเครื่องดนตรีครบแล้ว ทายว่า<span class="text-amber-900 font-semibold">เป็นวงดนตรีประเภทอะไร</span></p>
          </div>
        </div>
      </div>

      <!-- Category selection -->
      <div class="mb-8">
        <h3 class="text-amber-800/50 text-sm font-medium mb-3 uppercase tracking-widest">เลือกประเภทวง</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button @click="startGame(null)" class="btn-choice text-center !py-3.5 flex items-center justify-center gap-2">
            <Icon icon="mdi:shuffle-variant" class="w-5 h-5 text-amber-700" />
            <span>สุ่มทุกประเภท</span>
          </button>
          <button @click="startGame('piphat')" class="btn-choice text-center !py-3.5 flex items-center justify-center gap-2">
            <Icon icon="game-icons:drum" class="w-5 h-5 text-red-700" />
            <span>วงปี่พาทย์</span>
          </button>
          <button @click="startGame('khrueang-sai')" class="btn-choice text-center !py-3.5 flex items-center justify-center gap-2">
            <Icon icon="game-icons:violin" class="w-5 h-5 text-emerald-700" />
            <span>วงเครื่องสาย</span>
          </button>
          <button @click="startGame('mahori')" class="btn-choice text-center !py-3.5 flex items-center justify-center gap-2">
            <Icon icon="game-icons:musical-notes" class="w-5 h-5 text-violet-700" />
            <span>วงมโหรี</span>
          </button>
        </div>
      </div>

      <div class="thai-deco-line mb-6"></div>

      <!-- Footer -->
      <p class="text-amber-800/30 text-xs">
        ครอบคลุม 3 ประเภทหลัก · 19 วงดนตรี · 30+ เครื่องดนตรี
      </p>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useGame } from '../composables/useGame'
const { startGame } = useGame()
</script>
