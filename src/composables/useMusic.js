import { ref } from 'vue'

const audio = ref(null)
const isPlaying = ref(false)
const hasInteracted = ref(false)

export function useMusic() {
  function initAudio() {
    if (!audio.value) {
      audio.value = new Audio('/audio/thai-music.mp3')
      audio.value.loop = true
      audio.value.volume = 0.3
    }
  }

  function play() {
    initAudio()
    audio.value.play().then(() => {
      isPlaying.value = true
      hasInteracted.value = true
    }).catch(() => {
      // Browser blocked autoplay — that's fine
    })
  }

  function pause() {
    if (audio.value) {
      audio.value.pause()
      isPlaying.value = false
    }
  }

  function toggle() {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  // Start music on first user interaction
  function tryAutoPlay() {
    if (!hasInteracted.value) {
      play()
    }
  }

  return { isPlaying, hasInteracted, play, pause, toggle, tryAutoPlay }
}
