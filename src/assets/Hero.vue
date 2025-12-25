<template>
  <div class="relative w-full h-[400px] overflow-hidden rounded-xl">
    <img
      :src="images[currentIndex]"
      class="w-full h-full object-cover transition-all duration-700"
      alt="slider"
    />
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const images = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg'
]

const currentIndex = ref(0)
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value =
      (currentIndex.value + 1) % images.length
  }, 5000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>
</script>