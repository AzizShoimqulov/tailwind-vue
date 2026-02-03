<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { searchTerm } from './searchStore'
import { cartCount, cartItems, removeFromCart, clearCart } from './cartStore'

const { t, locale } = useI18n()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isLangMenuOpen = ref(false)
const isCartOpen = ref(false)

const languages = [
  { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
]

const currentLang = computed(() => {
  return languages.find(lang => lang.code === locale.value) || languages[0]
})

const navItems = computed(() => [
  { id: 1, name: t('nav.home'), link: '/' },
  { id: 2, name: t('nav.menu'), link: '/menyu' },
  { id: 3, name: t('about'), link: '/about' },
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
  if (!e.target.closest('.cart-dropdown')) {
    isCartOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', closeDropdowns)
  
  handleScroll()

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
      'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent py-4 lg:py-2',
      'bg-[#F4EDDD]',
      isScrolled ? 'lg:bg-white/95 lg:backdrop-blur-md lg:shadow-md' : ''
    ]"
  >
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        
        <!-- LOGO -->
        <a href="/" class="flex items-center gap-2">
            <div class="h-12 w-28 md:h-16 md:w-40 overflow-hidden">
              <img class="w-full h-full object-cover" src="./img/image copy 3.png" alt="Logo" />
            </div>
        </a>

        <!-- DESKTOP MENU (Katta ekranlar uchun) -->
        <nav class="hidden lg:flex items-center gap-6 xl:gap-8">
          <ul class="flex gap-4 xl:gap-6 text-sm font-bold text-gray-600 uppercase tracking-wide">
            <li v-for="item in navItems" :key="item.id">
              <router-link :to="item.link" class="hover:text-pink-600 transition-colors">{{ item.name }}</router-link>
            </li>
          </ul>
        </nav>

        <!-- O'NG TOMON (Search, Til, Savat, Mobil Menu) -->
        <div class="flex items-center gap-3 sm:gap-4">
          
          <!-- Qidiruv (Faqat katta ekranda) -->
          <div class="hidden xl:block relative group">
             <input v-model="searchTerm" type="text" :placeholder="t('search')" class="pl-9 pr-4 py-2 w-32 focus:w-48 rounded-full border border-gray-300 focus:border-pink-500 outline-none transition-all duration-300 bg-white/50 text-sm">
             <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <!-- Til sozlamalari (Faqat katta ekranda) -->
          <div class="hidden lg:block relative lang-dropdown">
            <button 
              @click="isLangMenuOpen = !isLangMenuOpen"
              class="flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-black/5 transition-colors text-gray-700 font-medium text-sm"
            >
              <span>{{ currentLang.flag }}</span>
              <span>{{ currentLang.name }}</span>
              <Icon icon="mdi:chevron-down" class="text-gray-400" />
            </button>
            
            <!-- Til menyusi Dropdown -->
            <div v-if="isLangMenuOpen" class="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1 animate-fade-in-down">
               <button 
                 v-for="lang in languages" 
                 :key="lang.code"
                 @click="setLang(lang)"
                 class="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 flex items-center gap-2"
                 :class="{ 'text-pink-600 font-bold': locale === lang.code }"
               >
                 <span>{{ lang.flag }}</span>
                 {{ lang.name }}
               </button>
            </div>
          </div>

          <!-- SAVAT (CART) - Hammada ko'rinadi (Mobilda ham) -->
          <div class="relative cart-dropdown">
            <button @click="isCartOpen = !isCartOpen" class="relative p-2 text-gray-700 hover:text-pink-600 transition-colors">
              <Icon icon="mdi:cart-outline" class="w-6 h-6 sm:w-7 sm:h-7" />
              <!-- Savatdagi mahsulot soni -->
              <span v-if="cartCount > 0" class="absolute top-0 right-0 bg-[#E93325] text-white text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#F4EDDD]">
                {{ cartCount }}
              </span>
            </button>
             
             <!-- Savat Dropdown (Soddalashtirilgan) -->
             <div v-if="isCartOpen" class="absolute top-full right-0 mt-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in-down">
                <div class="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 class="font-bold text-lg">Savat</h3>
                  <button @click="clearCart" class="text-xs text-red-500 hover:underline">Tozalash</button>
                </div>
                <div class="p-4 max-h-64 overflow-y-auto custom-scrollbar">
                   <p v-if="cartItems.length === 0" class="text-center text-gray-400 py-4">Savatcha bo'sh</p>
                   <!-- Bu yerda savat elementlari bo'ladi -->
                </div>
                <div class="p-4 bg-gray-50 border-t border-gray-100">
                  <button class="w-full bg-[#E93325] text-white py-2 rounded-lg font-bold hover:bg-red-700 transition">Buyurtma berish</button>
                </div>
             </div>
          </div>

          <!-- MOBIL MENU TUGMASI (Uchta chiziq) - Faqat mobilda ko'rinadi -->
          <button @click="toggleMenu" class="lg:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors">
            <Icon icon="mdi:menu" class="w-7 h-7" />
          </button>

        </div>
      </div>
    </div>
  </header>

  <!-- MOBIL MENU QISMI (O'zgartirishsiz qoldirildi) -->
  <transition enter-active-class="transition duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="isMobileMenuOpen" @click="toggleMenu" class="fixed inset-0 bg-black/50 z-[60] lg:hidden"></div>
  </transition>
  
  <transition enter-active-class="transition duration-300 transform" enter-from-class="translate-x-full" enter-to-class="translate-x-0" leave-active-class="transition duration-200 transform" leave-from-class="translate-x-0" leave-to-class="translate-x-full">
     <aside v-if="isMobileMenuOpen" class="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[70] p-6 overflow-y-auto lg:hidden flex flex-col">
       <div class="flex items-center justify-between mb-6">
         <a href="/" class="flex items-center gap-2">
           <div class="h-10 w-10 rounded-full overflow-hidden border-2 border-pink-500">
             <img class="w-full h-full object-cover" src="./img/image copy 3.png" alt="Logo" />
           </div>
           <span class="font-bold text-lg">Beyoglu Karshi</span>
         </a>
         <button @click="toggleMenu" class="p-2 text-gray-700">
           <Icon icon="mdi:close" class="w-6 h-6" />
         </button>
       </div>

       <nav class="flex flex-col gap-4">
         <router-link v-for="item in navItems" :key="item.id" :to="item.link" @click="toggleMenu" class="block text-gray-700 font-semibold py-2 border-b border-gray-100">{{ item.name }}</router-link>
       </nav>

       <div class="mt-auto">
         <a href="tel:+998901234567" class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#E93325] text-white font-bold">Buyurtma</a>
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
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
</style>