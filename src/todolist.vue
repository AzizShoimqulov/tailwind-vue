<template>
  <header class="sticky top-0 z-50">
    <section :class="['w-full', isScrolled ? 'bg-[#F4EDDD] shadow-md py-2 transition-colors duration-300' : 'bg-[#F3EDDF] py-4 transition-colors duration-300']">
      <div class="max-w-[1400px] m-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center gap-3 md:gap-6 md:flex-row md:items-center">
          <div class="flex justify-between items-center w-full md:w-auto md:mr-6">
            <a href="/" class="md:text-2xl text-center flex font-bold text-pink-600"><img class="md:h-16 w-full h-10 object-cover rounded-3xl" src="./img/image copy 3.png" alt="Bu yerda rasm bor">Beyoglu Karshi</a>
            <button class="md:hidden text-gray-700 hover:text-indigo-600" aria-label="Toggle mobile menu"
              @click="isMobileMenuOpen = !isMobileMenuOpen">
              <Icon icon="mdi:menu" class="w-7 h-7" />
            </button>
          </div>

          <nav class="md:flex-1 flex justify-center" aria-label="Main navigation">
            <div class="px-4 sm:px-6 lg:px-8">
              <ul class="hidden md:flex justify-center py-3 flex-wrap gap-x-8 md:gap-x-10 text-lg md:text-xl font-serif font-semibold text-black items-center">
                <li v-for="(item, index) in navItems" :key="item.id" class="flex items-center">
                  <!-- show a subtle vertical divider before items except the first -->
                  <span v-if="index > 0" class="hidden md:inline-block h-6 border-l border-gray-300 mr-4"></span>
                  <a :href="item.link" class="hover:text-pink-800 transition-colors">{{ item.name }}</a>
                </li>
              </ul>

              <section v-if="isMobileMenuOpen"
                class="md:hidden w-80 mt-2 bg-white rounded-lg shadow-md p-4 space-y-4 text-[#5D4037] text-center"
                aria-label="Mobile Navigation">
                <a v-for="item in navItems" :href="item.link" :key="item.id"
                  class="block hover:text-amber-600 text-lg font-semibold py-3 border-t border-gray-200 first:border-t-0">{{ item.name }}</a>
              </section>

            </div>
          </nav>

          
          <!-- Search Bar -->
          <form class="w-full md:w-[150px] md:max-w-2xl max-w-sm" role="search" aria-label="Site search">
            <label class="relative w-full">
              <input type="text" placeholder="Search..." class="w-full
               px-3 py-2 text-[15px] border border-gray-300 rounded-full focus:outline-none
              focus:ring-2 focus:ring-indigo-500">

              <button type="submit"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                aria-label="Search button">
                <Icon icon="mdi:magnify" class="w-4 h-4" />
              </button>
            </label>
          </form>
          <!-- Icons-->
          <aside class="flex items-center justify-center sm:justify-end space-x-4 w-full md:w-auto md:ml-auto">
            <button class="relative p-2 text-gray-700 hover:text-pink-600" aria-label="Wishlist">
              <!-- Force exact size: set width/height props AND inline px styles to override any CSS that may affect the SVG -->
              <Icon icon="mdi:call-outline" width="20" height="20" style="width:20px;height:20px;display:inline-block;" />
            </button>
            <div>
              <p class="">HOT LINE</p>
              <p class="font-extrabold">+998 90 123 45 67</p>
            </div>
            <button class="relative p-2 text-gray-700 hover:text-pink-600" aria-label="Wishlist">
              <Icon icon="mdi:cart-outline" class="w-5 h-5" />
              <span class="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5
              flex items-center justify-center">5</span>
            </button>
          </aside>
        </div>
      </div>
    </section>
  </header>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const navItems = [
  { id: 1, name: 'HOME', link: '#home' },
  { id: 2, name: 'MENU', link: '#products' },
  { id: 3, name: 'PAGES', link: '#categories' },
  { id: 4, name: 'BLOG', link: '#offers' },
  { id: 5, name: 'SHOP', link: '#about' },
]

// increase threshold to avoid rapid toggles while scrolling small amounts
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
})
</script>