<template>
  <div class="relative w-[92%] rounded-2xl mt-10 h-[550px] overflow-hidden mx-auto">
    <!-- Images Wrapper -->
    <div
      class="flex h-full transition-transform duration-700 ease-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(image, i) in images"
        :key="i"
        class="min-w-full h-full bg-cover bg-center"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
    </div>

    <!-- Dots -->
    <div class="absolute bottom-4 w-full flex justify-center gap-2">
      <button
        v-for="(image, i) in images"
        :key="'dot'+i"
        @click="goTo(i)"
        class="w-3 h-3 rounded-full transition"
        :class="currentIndex === i ? 'bg-white' : 'bg-white/40'"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const images = [
        'https://www.beyoglu-karshi.com/assets/slider11-CvMoDVWg.JPG',
        'https://www.beyoglu-karshi.com/assets/slider6-BtSvGVij.JPG',
        'https://www.beyoglu-karshi.com/assets/slider13-BzaDouYa.JPG',
        'https://www.beyoglu-karshi.com/assets/slider8-Dc2b-Gmr.JPG',
        'https://www.beyoglu-karshi.com/assets/slider2-CEDuP1-F.JPG'
]

const currentIndex = ref(0);
let interval = null;

const next = () => {
  // images is a plain array (not a ref) so use images.length
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

const goTo = (i) => {
  currentIndex.value = i;
};

onMounted(() => {
  if (images.length > 1) {
    interval = setInterval(next, 3000); // har 3 sekundda almashadi
  }
});

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});
</script>
