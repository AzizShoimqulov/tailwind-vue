<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Icon } from '@iconify/vue'

const slides = [
  { id: 1, image: 'https://www.beyoglu-karshi.com/assets/slider11-CvMoDVWg.JPG', title: "Haqiqiy Turk Ta'mi", subtitle: "Eng saralangan masalliqlar." },
  { id: 2, image: 'https://www.beyoglu-karshi.com/assets/slider6-BtSvGVij.JPG', title: "Mazali Nonushtalar", subtitle: "Kuningizni ajoyib boshlang." },
  { id: 3, image: 'https://www.beyoglu-karshi.com/assets/slider13-BzaDouYa.JPG', title: "Maxsus Shirinliklar", subtitle: "San'at darajasidagi shirinliklar." },
  { id: 4, image: 'https://www.beyoglu-karshi.com/assets/slider8-Dc2b-Gmr.JPG', title: "Oilaviy Muhit", subtitle: "Yaqinlaringiz bilan birga." },
  { id: 5, image: 'https://www.beyoglu-karshi.com/assets/slider2-CEDuP1-F.JPG', title: "Tez va Issiq", subtitle: "Kutdirmasdan yetkazamiz." }
]

const currentIndex = ref(0);
let interval = null;

const next = () => currentIndex.value = (currentIndex.value + 1) % slides.length;
const prev = () => currentIndex.value = currentIndex.value === 0 ? slides.length - 1 : currentIndex.value - 1;
const goTo = (i) => currentIndex.value = i;
const pauseAutoPlay = () => clearInterval(interval);
const startAutoPlay = () => {
  if (slides.length > 1) interval = setInterval(next, 5000);
};

onMounted(() => startAutoPlay());
onBeforeUnmount(() => clearInterval(interval));
</script>

<template>
  <!-- pt-24 (mobile), md:pt-28 (tablet), lg:pt-32 (desktop) -> Navbar joyi uchun padding -->
  <div class="bg-[#F4EDDD] pb-8 pt-24 md:pt-28 lg:pt-28">
    
    <div 
      class="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 group"
      @mouseenter="pauseAutoPlay"
      @mouseleave="startAutoPlay"
    >
      
      <!-- Slayder Oynasi -->
      <div class="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl border-4 border-white transform transition-transform duration-300 hover:scale-[1.01]">
        
        <!-- Rasmlar harakati -->
        <div
          class="flex h-full transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="slide in slides"
            :key="slide.id"
            class="min-w-full h-full relative"
          >
            <img :src="slide.image" class="w-full h-full object-cover" alt="Slide" />
            
            <!-- Qora fon (Matn ko'rinishi uchun) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

            <!-- Matn -->
            <div class="absolute bottom-8 left-6 md:bottom-16 md:left-12 max-w-[90%] md:max-w-[600px] text-white">
               <h2 class="text-2xl md:text-5xl font-bold font-serif mb-2 drop-shadow-lg">{{ slide.title }}</h2>
               <p class="text-sm md:text-lg text-gray-200 font-medium line-clamp-2 drop-shadow-md mb-4">{{ slide.subtitle }}</p>
               <button class="bg-pink-600 text-white px-5 py-2 md:px-8 md:py-3 rounded-full font-bold hover:bg-pink-700 transition text-xs md:text-sm">
                 Batafsil
               </button>
            </div>
          </div>
        </div>

        <!-- O'ng va Chap tugmalar -->
        <button @click="prev" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white text-white hover:text-gray-800 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Icon icon="mdi:chevron-left" class="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <button @click="next" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white text-white hover:text-gray-800 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Icon icon="mdi:chevron-right" class="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <!-- Nuqtalar -->
        <div class="absolute bottom-4 right-4 flex gap-2">
          <button v-for="(slide, i) in slides" :key="i" @click="goTo(i)" class="transition-all duration-300 rounded-full shadow-sm border border-white/50" :class="currentIndex === i ? 'w-6 h-2 bg-pink-500' : 'w-2 h-2 bg-white/60'"></button>
        </div>

      </div>
    </div>
  </div>
</template>