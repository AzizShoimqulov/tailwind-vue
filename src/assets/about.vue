<template>
  <section id="about" class="py-16 sm:py-24 bg-white overflow-hidden">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div class="relative order-2 lg:order-1">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop" 
              alt="Restaurant Interior" 
              class="w-full h-[400px] lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div class="absolute -bottom-10 -right-4 sm:-right-10 w-48 sm:w-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white transform hover:-translate-y-2 transition-transform duration-300">
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop" 
              alt="Delicious Food" 
              class="w-full h-40 sm:h-48 object-cover"
            />
          </div>
          <div class="absolute -top-6 -left-6 bg-[#E93325] text-white p-6 rounded-full shadow-lg flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 animate-bounce-slow">
            <span class="text-3xl sm:text-4xl font-extrabold">10+</span>
            <span class="text-xs sm:text-sm font-medium text-center leading-tight">Yillik Tajriba</span>
          </div>
        </div>
        <div class="order-1 lg:order-2">
          <span class="text-[#E93325] font-bold tracking-wider uppercase text-sm mb-2 block">
            Biz Haqimizda
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Haqiqiy <span class="text-[#E93325]">Turk Ta'mi</span> va Mehmondo'stlik
          </h2>
          
          <p class="text-gray-600 text-lg mb-6 leading-relaxed">
            <strong class="text-gray-800">Beyoglu Karshi</strong> — bu shunchaki restoran emas, balki Turkiyaning boy oshxona madaniyatini Qarshi shahriga olib kelgan maskan. Biz har bir taomni mehr va eng sara masalliqlar bilan tayyorlaymiz.
          </p>
          
          <p class="text-gray-500 mb-8 leading-relaxed">
            Siz bizda nafaqat mazali kaboblar va pidelarni, balki maxsus retsept asosida tayyorlangan shirinliklar va haqiqiy turk choyini ham tatib ko'rishingiz mumkin. Bizning maqsadimiz — har bir mehmonimizga o'zini xuddi Istanbulda yurgandek his qildirishdir.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div v-for="(item, index) in features" :key="index" class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E93325]">
                <Icon :icon="item.icon" class="w-5 h-5" />
              </div>
              <span class="font-bold text-gray-700">{{ item.text }}</span>
            </div>
          </div>
          <a href="#menu" class="inline-flex items-center gap-2 bg-[#E93325] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-red-500/30 transform hover:-translate-y-1">
            <span>Menyuni ko'rish</span>
            <Icon icon="mdi:arrow-right" class="w-5 h-5" />
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const features = [
  { text: "Halol Masalliqlar", icon: "mdi:check-decagram" },
  { text: "Professional Oshpazlar", icon: "mdi:chef-hat" },
  { text: "Tezkor Yetkazib Berish", icon: "mdi:moped" },
  { text: "Shinam Muhit", icon: "mdi:sofa" },
]
</script>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>