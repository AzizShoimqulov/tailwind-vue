<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'


const { t, locale } = useI18n()


const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isLangMenuOpen = ref(false)


const languages = [
  { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
]


const currentLang = computed(() => {
  return languages.find(lang => lang.code === locale.value) || languages[0]
})


const navItems = computed(() => [
  { id: 1, name: t('nav.home'), link: '#home' },
  { id: 2, name: t('nav.menu'), link: '#menu' },
  { id: 3, name: t('nav.pages'), link: '#pages' },
  { id: 4, name: t('nav.blog'), link: '#blog' },
  { id: 5, name: t('nav.shop'), link: '#shop' },
])


const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}


const setLang = (lang) => {
  locale.value = lang.code
  isLangMenuOpen.value = false 

  localStorage.setItem('user-locale', lang.code)
}

const closeDropdowns = (e) => {
  if (!e.target.closest('.lang-dropdown')) {
    isLangMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', closeDropdowns)
  
  const savedLang = localStorage.getItem('user-locale')
  if (savedLang) {
    locale.value = savedLang
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', closeDropdowns)
})
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent',
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-[#F4EDDD] py-4'
    ]"
  >
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        
        <a href="/" class="flex items-center gap-2 group">
          <div class="h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden border-2 border-pink-500">
             <img class="w-full h-full object-cover" src="./img/image copy 3.png" alt="Logo" />
          </div>
          <span class="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
            Beyoglu Karshi
          </span>
        </a>

        <nav class="hidden lg:flex items-center gap-6 xl:gap-8">
          <ul class="flex gap-4 xl:gap-6 text-sm font-bold text-gray-600 uppercase tracking-wide">
            <li v-for="item in navItems" :key="item.id">
              <a :href="item.link" class="hover:text-pink-600 transition-colors">{{ item.name }}</a>
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-2 sm:gap-3">
          
          <div class="hidden xl:block relative group">
             <input type="text" :placeholder="t('search')" class="pl-9 pr-4 py-2 w-32 focus:w-48 rounded-full border border-gray-300 focus:border-pink-500 outline-none transition-all duration-300 bg-white/50 text-sm">
             <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div class="hidden lg:block relative lang-dropdown">
            <button 
              @click="isLangMenuOpen = !isLangMenuOpen"
              class="flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-black/5 transition-colors text-gray-700 font-medium text-sm"
            >
              <span>{{ currentLang.flag }}</span>
              <span class="uppercase">{{ currentLang.code }}</span>
              <Icon icon="mdi:chevron-down" class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isLangMenuOpen }" />
            </button>

            <div 
              v-if="isLangMenuOpen"
              class="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-1 animate-fade-in-down"
            >
              <button 
                v-for="lang in languages" 
                :key="lang.code"
                @click="setLang(lang)"
                class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors text-left"
                :class="{ 'bg-pink-50 text-pink-600 font-bold': currentLang.code === lang.code }"
              >
                <span>{{ lang.flag }}</span>
                <span>{{ lang.name }}</span>
              </button>
            </div>
          </div>

          <div class="hidden md:flex items-center gap-2 border-r border-l px-3 border-gray-300">
            <div class="p-1.5 bg-pink-100 rounded-full text-pink-600">
               <Icon icon="mdi:phone" width="16" />
            </div>
            <div class="flex flex-col leading-tight">
              <span class="text-[9px] text-gray-500 font-bold uppercase">{{ t('hotline') }}</span>
              <span class="text-xs font-extrabold text-gray-800">+998 90 123 45 67</span>
            </div>
          </div>

          <button class="relative p-2 hover:bg-black/5 rounded-full transition-colors">
            <Icon icon="mdi:cart-outline" class="w-6 h-6 text-gray-700" />
            <span class="absolute top-0 right-0 bg-pink-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">5</span>
          </button>

          <button @click="toggleMenu" class="lg:hidden p-2 text-gray-700">
            <Icon icon="mdi:menu" class="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  </header>

  <transition enter-active-class="transition duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="isMobileMenuOpen" @click="toggleMenu" class="fixed inset-0 bg-black/50 z-[60] lg:hidden"></div>
  </transition>

  <transition enter-active-class="transition duration-300 transform" enter-from-class="translate-x-full" enter-to-class="translate-x-0" leave-active-class="transition duration-200 transform" leave-from-class="translate-x-0" leave-to-class="translate-x-full">
    <aside v-if="isMobileMenuOpen" class="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[70] p-6 overflow-y-auto lg:hidden flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <span class="text-xl font-bold text-gray-800">{{ t('nav.menu') }}</span>
        <button @click="toggleMenu" class="p-2 hover:bg-gray-100 rounded-full"><Icon icon="mdi:close" class="w-6 h-6 text-gray-500" /></button>
      </div>

      <div class="mb-6">
        <p class="text-xs font-bold text-gray-400 uppercase mb-2">{{ t('select_lang') }}</p>
        <div class="flex gap-2">
          <button 
            v-for="lang in languages" 
            :key="lang.code"
            @click="setLang(lang)"
            class="flex-1 py-2 px-1 border rounded-lg text-center transition-colors text-sm flex items-center justify-center gap-1"
            :class="currentLang.code === lang.code ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold' : 'border-gray-200 text-gray-600'"
          >
             <span>{{ lang.flag }}</span>
             <span>{{ lang.code.toUpperCase() }}</span>
          </button>
        </div>
      </div>

      <ul class="space-y-2 mb-auto">
        <li v-for="item in navItems" :key="item.id">
          <a :href="item.link" @click="toggleMenu" class="block py-3 px-4 rounded-lg text-lg font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors">{{ item.name }}</a>
        </li>
      </ul>
      
      <div class="mt-6 pt-6 border-t border-gray-100 text-center">
         <p class="text-gray-400 text-sm">{{ t('contact_us') }}</p>
         <p class="text-lg font-bold text-gray-800 mt-1">+998 90 123 45 67</p>
      </div>
    </aside>
  </transition>
</template>

<style scoped>
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-down {
  animation: fadeInDown 0.2s ease-out forwards;
}
</style>