<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <div class="text-center animate-slide-up max-w-4xl w-full">
      <!-- Logo -->
      <div class="mb-5 flex justify-center">
        <div class="w-20 h-20 rounded-3xl bg-[#f5f5f7] flex items-center justify-center">
          <Icon icon="game-icons:musical-notes" class="w-10 h-10 text-[#1c1c1e]" />
        </div>
      </div>
      <h1 class="text-5xl md:text-6xl font-extrabold mb-3 text-[#f5f5f7]">
        ทายวงดนตรีไทย
      </h1>
      <p class="text-[#98989d] text-xl mb-10">
        ทดสอบความรู้เรื่องเครื่องดนตรีและวงดนตรีไทย
      </p>

      <div class="thai-deco-line mb-10"></div>

      <!-- How to play -->
      <div class="glass-card-gold p-8 mb-10 text-left">
        <h2 class="text-xl font-semibold text-[#f5f5f7] mb-6 text-center flex items-center justify-center gap-3">
          <Icon icon="mdi:information-outline" class="w-7 h-7 text-[#98989d]" />
          วิธีเล่น
        </h2>
        <div class="space-y-5">
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-8 h-8 rounded-full bg-[#2c2c2e] flex items-center justify-center text-base font-semibold text-[#f5f5f7]">1</span>
            <p class="text-[#98989d] text-lg pt-0.5">เครื่องดนตรีในวงจะแสดงขึ้นมา แต่จะมี<span class="font-semibold text-[#f5f5f7]">บางชิ้นหายไป</span></p>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-8 h-8 rounded-full bg-[#2c2c2e] flex items-center justify-center text-base font-semibold text-[#f5f5f7]">2</span>
            <p class="text-[#98989d] text-lg pt-0.5">ทายว่าเครื่องดนตรีที่หายไปคือ<span class="font-semibold text-[#f5f5f7]">เครื่องดนตรีอะไร</span></p>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-8 h-8 rounded-full bg-[#2c2c2e] flex items-center justify-center text-base font-semibold text-[#f5f5f7]">3</span>
            <p class="text-[#98989d] text-lg pt-0.5">เมื่อเครื่องดนตรีครบแล้ว ทายว่า<span class="font-semibold text-[#f5f5f7]">เป็นวงดนตรีประเภทอะไร</span></p>
          </div>
        </div>
      </div>

      <!-- Category selection -->
      <div class="mb-8">
        <h3 class="text-[#98989d] text-base font-semibold mb-5 uppercase tracking-widest">เลือกประเภทวง</h3>
        <div class="grid grid-cols-2 gap-4">
          <button @click="startGame(null)" class="btn-choice text-center !py-3.5 flex items-center justify-center gap-2">
            <Icon icon="mdi:shuffle-variant" class="w-7 h-7 text-[#98989d]" />
            <span>สุ่มทุกประเภท</span>
          </button>
          <button @click="startGame('piphat')" class="btn-choice text-center !py-3.5 flex items-center justify-center gap-2">
            <Icon icon="game-icons:drum" class="w-7 h-7 text-[#ff453a]" />
            <span>วงปี่พาทย์</span>
          </button>
          <button @click="startGame('khrueang-sai')" class="btn-choice text-center !py-3.5 flex items-center justify-center gap-2">
            <Icon icon="game-icons:violin" class="w-7 h-7 text-[#30d158]" />
            <span>วงเครื่องสาย</span>
          </button>
          <button @click="startGame('mahori')" class="btn-choice text-center !py-3.5 flex items-center justify-center gap-2">
            <Icon icon="game-icons:musical-notes" class="w-7 h-7 text-[#bf5af2]" />
            <span>วงมโหรี</span>
          </button>
        </div>
      </div>

      <div class="thai-deco-line mb-6"></div>

      <p class="text-[#48484a] text-base">
        ครอบคลุม 3 ประเภทหลัก · 19 วงดนตรี · 30+ เครื่องดนตรี
      </p>
      <p class="text-[#48484a] text-base mt-3">
        Made by <span class="text-[#98989d]">Wanwisa Leonyos</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useGame } from '../composables/useGame'
import { useMusic } from '../composables/useMusic'

const { startGame: _startGame } = useGame()
const { tryAutoPlay } = useMusic()

function startGame(category) {
  tryAutoPlay()
  _startGame(category)
}
</script>
