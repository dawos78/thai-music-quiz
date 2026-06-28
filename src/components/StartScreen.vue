<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
    <!-- Floating decorative elements -->
    <div class="absolute top-20 left-10 w-20 h-20 opacity-10 animate-float">
      <img src="/instruments/ranad-ek.png" alt="" class="w-full h-full object-contain" />
    </div>
    <div class="absolute top-40 right-16 w-16 h-16 opacity-10 animate-float" style="animation-delay: 1s;">
      <img src="/instruments/khong-wong-yai.png" alt="" class="w-full h-full object-contain" />
    </div>
    <div class="absolute bottom-32 left-20 w-14 h-14 opacity-10 animate-float" style="animation-delay: 2s;">
      <img src="/instruments/saw-duang.png" alt="" class="w-full h-full object-contain" />
    </div>
    <div class="absolute bottom-20 right-10 w-18 h-18 opacity-10 animate-float" style="animation-delay: 0.5s;">
      <img src="/instruments/ching.png" alt="" class="w-full h-full object-contain" />
    </div>

    <!-- Main content -->
    <div class="text-center animate-slide-up max-w-xl w-full">
      <!-- Logo / Title -->
      <div class="mb-2">
        <span class="text-6xl mb-4 block animate-float">🎵</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-black mb-3 text-gradient-gold leading-tight">
        ทายวงดนตรีไทย
      </h1>
      <p class="text-amber-200/60 text-lg mb-8">
        ทดสอบความรู้เรื่องเครื่องดนตรีและวงดนตรีไทย
      </p>

      <div class="thai-deco-line mb-8"></div>

      <!-- Game description card -->
      <div class="glass-card-gold p-6 mb-8 text-left">
        <h2 class="text-xl font-bold text-amber-300 mb-4 text-center">🎮 วิธีเล่น</h2>
        <div class="space-y-3">
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-sm font-bold text-amber-300">1</span>
            <p class="text-amber-100/80 text-sm pt-1">เครื่องดนตรีในวงจะแสดงขึ้นมา แต่จะมี<span class="text-amber-300 font-semibold">บางชิ้นหายไป</span></p>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-sm font-bold text-amber-300">2</span>
            <p class="text-amber-100/80 text-sm pt-1">ทายว่าเครื่องดนตรีที่หายไปคือ<span class="text-amber-300 font-semibold">เครื่องดนตรีอะไร</span></p>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-sm font-bold text-amber-300">3</span>
            <p class="text-amber-100/80 text-sm pt-1">เมื่อเครื่องดนตรีครบแล้ว ทายว่า<span class="text-amber-300 font-semibold">เป็นวงดนตรีประเภทอะไร</span></p>
          </div>
        </div>
      </div>

      <!-- Category selection -->
      <div class="mb-8">
        <h3 class="text-amber-300/80 text-sm font-medium mb-3 uppercase tracking-widest">เลือกประเภทวง</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            @click="startGame(null)"
            class="btn-choice text-center !py-3 hover:!bg-amber-500/20"
          >
            <span class="text-lg">🎲</span>
            <span class="ml-2">สุ่มทุกประเภท</span>
          </button>
          <button
            @click="startGame('piphat')"
            class="btn-choice text-center !py-3 hover:!bg-amber-500/20"
          >
            <span class="text-lg">🥁</span>
            <span class="ml-2">วงปี่พาทย์</span>
          </button>
          <button
            @click="startGame('khrueang-sai')"
            class="btn-choice text-center !py-3 hover:!bg-emerald-500/20 hover:!border-emerald-500/30"
          >
            <span class="text-lg">🎻</span>
            <span class="ml-2">วงเครื่องสาย</span>
          </button>
          <button
            @click="startGame('mahori')"
            class="btn-choice text-center !py-3 hover:!bg-purple-500/20 hover:!border-purple-500/30"
          >
            <span class="text-lg">🎶</span>
            <span class="ml-2">วงมโหรี</span>
          </button>
        </div>
      </div>

      <div class="thai-deco-line mb-6"></div>

      <!-- Footer info -->
      <p class="text-amber-200/30 text-xs">
        ครอบคลุม 3 ประเภทหลัก · 19 วงดนตรี · 30+ เครื่องดนตรี
      </p>
    </div>
  </div>
</template>

<script setup>
import { useGame } from '../composables/useGame'
const { startGame } = useGame()
</script>
