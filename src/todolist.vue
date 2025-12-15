<template>
  <header class="sticky top-0 z-50 transition-all duration-300">
    <section :class="['w-full',isScrolled ? 'bg-gray-100/95 backdrop-blur shadow-md py-2' : 'bg-gray-100 py-4']">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center justify-between gap-3 md:gap-6">
          
          <div class="flex justify-between items-center w-full md:w-auto">
            <a href="/" class="text-2xl font-bold text-pink-600">ShopEase</a>
            <button
            class="md:hidden text-gray-700 hover:text-indigo-600"
            aria-label="Toggle mobile menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
            <Icon icon="mdi:menu" class="w-6 h-6"/>
            </button>
          </div>
          <!-- Search Bar -->
           <form class="w-full md:flex-1 max-w-sm" role="search" aria-label="Site search">
            
           </form>
        </div>
      </div>
    </section>
  </header>
</template>


<script setup>
import { Icon } from '@iconify/vue';
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
</script>