<template>
  <section id="about" class="py-16 sm:py-24 bg-white overflow-hidden">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div class="relative order-2 lg:order-1">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://www.beyoglu-karshi.com/assets/slider8-Dc2b-Gmr.JPG" 
              alt="Restaurant Interior" 
              class="w-full h-[400px] lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div class="absolute -top-6 -left-6 bg-[#E93325] text-white p-6 rounded-full shadow-lg flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 animate-bounce-slow">
            <span class="text-3xl sm:text-4xl font-extrabold">10+</span>
            <span class="text-xs sm:text-sm font-medium text-center leading-tight">Yillik Tajriba</span>
          </div>
        </div>
        <div class="order-1 lg:order-2">
          <span class="text-[#E93325] font-bold tracking-wider uppercase text-sm mb-2 block">{{ t('about.overline') }}</span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {{ t('about.title_prefix') }} <span class="text-[#E93325]">{{ t('about.title_highlight') }}</span>{{ t('about.title_suffix') }}
          </h2>

          <p class="text-gray-600 text-lg mb-6 leading-relaxed">
            <strong class="text-gray-800">Beyoglu Karshi</strong> — {{ t('about.paragraph1') }}
          </p>

          <p class="text-gray-500 mb-8 leading-relaxed">{{ t('about.paragraph2') }}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div v-for="(item, index) in features" :key="index" class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E93325]">
                <Icon :icon="item.icon" class="w-5 h-5" />
              </div>
              <span class="font-bold text-gray-700">{{ item.text }}</span>
            </div>
          </div>
          <router-link to="/menyu" class="inline-flex items-center gap-2 bg-[#E93325] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-red-500/30 transform hover:-translate-y-1">
            <span>{{ t('about.view_menu') }}</span>
            <Icon icon="mdi:arrow-right" class="w-5 h-5" />
          </router-link>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import Menu from './menyu.vue';

const features = [
  { text: "Halol Masalliqlar", icon: "mdi:check-decagram" },
  { text: "Professional Oshpazlar", icon: "mdi:chef-hat" },
  { text: "Tezkor Yetkazib Berish", icon: "mdi:moped" },
  { text: "Shinam Muhit", icon: "mdi:sofa" },
]
</script>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

const { t, tm } = useI18n()

// keep icons in fixed order and pull translated feature texts from i18n
const iconList = ["mdi:check-decagram","mdi:chef-hat","mdi:moped","mdi:sofa"]

const features = computed(() => {
  const raw = (typeof tm === 'function') ? tm('about.features') : t('about.features')
  let texts = []
  if (Array.isArray(raw)) texts = raw
  else if (raw == null) texts = []
  else texts = String(raw).split('|').map(s => s.trim()).filter(Boolean)
  return texts.map((text, i) => ({ text, icon: iconList[i] || 'mdi:check' }))
})
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