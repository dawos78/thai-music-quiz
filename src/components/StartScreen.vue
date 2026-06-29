<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <div class="text-center animate-slide-up max-w-xl w-full">
      <!-- Logo -->
      <div class="mb-5 flex justify-center">
        <div class="w-14 h-14 rounded-2xl bg-[#1d1d1f] flex items-center justify-center">
          <Icon icon="game-icons:musical-notes" class="w-7 h-7 text-white" />
        </div>
      </div>
      <h1 class="text-3xl md:text-4xl font-extrabold mb-2 text-[#1d1d1f]">
        ทายวงดนตรีไทย
      </h1>
      <p class="text-[#86868b] text-base mb-8">
        ทดสอบความรู้เรื่องเครื่องดนตรีและวงดนตรีไทย
      </p>

      <div class="thai-deco-line mb-8"></div>

      <!-- How to play -->
      <div class="glass-card-gold p-6 mb-8 text-left">
        <h2 class="text-base font-semibold text-[#1d1d1f] mb-4 text-center flex items-center justify-center gap-2">
          <Icon icon="mdi:information-outline" class="w-5 h-5 text-[#86868b]" />
          วิธีเล่น
        </h2>
        <div class="space-y-3">
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-[#f5f5f7] flex items-center justify-center text-xs font-semibold text-[#1d1d1f]">1</span>
            <p class="text-[#424245] text-sm pt-0.5">เครื่องดนตรีในวงจะแสดงขึ้นมา แต่จะมี<span class="font-semibold text-[#1d1d1f]">บางชิ้นหายไป</span></p>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-[#f5f5f7] flex items-center justify-center text-xs font-semibold text-[#1d1d1f]">2</span>
            <p class="text-[#424245] text-sm pt-0.5">ทายว่าเครื่องดนตรีที่หายไปคือ<span class="font-semibold text-[#1d1d1f]">เครื่องดนตรีอะไร</span></p>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-[#f5f5f7] flex items-center justify-center text-xs font-semibold text-[#1d1d1f]">3</span>
            <p class="text-[#424245] text-sm pt-0.5">เมื่อเครื่องดนตรีครบแล้ว ทายว่า<span class="font-semibold text-[#1d1d1f]">เป็นวงดนตรีประเภทอะไร</span></p>
          </div>
        </div>
      </div>

      <!-- Category selection -->
      <div class="mb-8">
        <h3 class="text-[#86868b] text-xs font-medium mb-3 uppercase tracking-widest">เลือกประเภทวง</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button @click="startGame(null)" class="btn-choice text-center !py-3.5 flex items-center justify-center gap-2">
            <Icon icon="mdi:shuffle-variant" class="w-5 h-5 text-[#86868b]" />
            <span>สุ่มทุกประเภท</span>
          </button>
          <button @click="startGame('piphat')" class="btn-choice text-center !py-3.5 flex items-center justify-center gap-2">
            <Icon icon="game-icons:drum" class="w-5 h-5 text-[#86868b]" />
            <span>วงปี่พาทย์</span>
          </button>
          <button @click="startGame('khrueang-sai')" class="btn-choice text-center !py-3.5 flex items-center justify-center gap-2">
            <Icon icon="game-icons:violin" class="w-5 h-5 text-[#86868b]" />
            <span>วงเครื่องสาย</span>
          </button>
          <button @click="startGame('mahori')" class="btn-choice text-center !py-3.5 flex items-center justify-center gap-2">
            <Icon icon="game-icons:musical-notes" class="w-5 h-5 text-[#86868b]" />
            <span>วงมโหรี</span>
          </button>
        </div>
      </div>

      <div class="thai-deco-line mb-6"></div>

      <p class="text-[#c7c7cc] text-xs">
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
