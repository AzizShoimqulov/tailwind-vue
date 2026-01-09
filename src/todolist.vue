<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { id: 1, name: 'HOME', link: '#home' },
  { id: 2, name: 'MENU', link: '#menu' },
  { id: 3, name: 'PAGES', link: '#pages' },
  { id: 4, name: 'BLOG', link: '#blog' },
  { id: 5, name: 'SHOP', link: '#shop' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- Navbar Fixed holatda -->
  <header 
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent',
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-[#F4EDDD] py-4'
    ]"
  >
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 group">
          <div class="h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden border-2 border-pink-500">
             <img class="w-full h-full object-cover" src="./img/image copy 3.png" alt="Logo" />
          </div>
          <span class="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
            Beyoglu Karshi
          </span>
        </a>

        <!-- Desktop Menu -->
        <nav class="hidden lg:flex items-center gap-8">
          <ul class="flex gap-6 text-sm font-bold text-gray-600 uppercase tracking-wide">
            <li v-for="item in navItems" :key="item.id">
              <a :href="item.link" class="hover:text-pink-600 transition-colors">{{ item.name }}</a>
            </li>
          </ul>
        </nav>

        <!-- Icons & Actions -->
        <div class="flex items-center gap-3">
          <!-- Search Desktop -->
          <div class="hidden lg:block relative group">
             <input type="text" placeholder="Search..." class="pl-9 pr-4 py-2 w-40 rounded-full border border-gray-300 focus:w-60 focus:border-pink-500 outline-none transition-all duration-300 bg-white/50 text-sm">
             <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <!-- Phone -->
          <div class="hidden md:flex items-center gap-2 border-r pr-4 border-gray-300">
            <div class="p-2 bg-pink-100 rounded-full text-pink-600">
               <Icon icon="mdi:phone" width="18" />
            </div>
            <div class="flex flex-col leading-tight">
              <span class="text-[10px] text-gray-500 font-bold">HOT LINE</span>
              <span class="text-sm font-extrabold text-gray-800">+998 90 123 45 67</span>
            </div>
          </div>

          <!-- Cart -->
          <button class="relative p-2 hover:bg-black/5 rounded-full transition-colors">
            <Icon icon="mdi:cart-outline" class="w-6 h-6 text-gray-700" />
            <span class="absolute top-0 right-0 bg-pink-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">5</span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button @click="toggleMenu" class="lg:hidden p-2 text-gray-700">
            <Icon icon="mdi:menu" class="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer Menu (O'zgarmadi, tepadagi koddagi kabi qolaveradi) -->
  <transition enter-active-class="transition duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="isMobileMenuOpen" @click="toggleMenu" class="fixed inset-0 bg-black/50 z-[60] lg:hidden"></div>
  </transition>

  <transition enter-active-class="transition duration-300 transform" enter-from-class="translate-x-full" enter-to-class="translate-x-0" leave-active-class="transition duration-200 transform" leave-from-class="translate-x-0" leave-to-class="translate-x-full">
    <aside v-if="isMobileMenuOpen" class="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[70] p-6 overflow-y-auto lg:hidden">
      <div class="flex justify-between items-center mb-6">
        <span class="text-xl font-bold">Menu</span>
        <button @click="toggleMenu"><Icon icon="mdi:close" class="w-6 h-6" /></button>
      </div>
      <ul class="space-y-4">
        <li v-for="item in navItems" :key="item.id">
          <a :href="item.link" @click="toggleMenu" class="block text-lg font-semibold text-gray-700 hover:text-pink-600">{{ item.name }}</a>
        </li>
      </ul>
    </aside>
  </transition>
</template>