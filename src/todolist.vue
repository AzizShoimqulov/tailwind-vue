<template>
  <header class="sticky top-0 z-50 transition-all duration-300">
    <section>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center justify-between gap-3 md:gap-6">
          
          <div class="flex justify-between items-center w-full md:w-auto">
            <a href="/" class="text-2xl font-bold text-pink-600">ShopEase</a>
            <button
            class="md:hidden text-gray-700 hover:text-indigo-600"
            aria-label="Toggle mobile menu"
            >
            <Icon icon="mdi:menu" class="w-6 h-6"/>
            </button>

          </div>
        </div>
      </div>
    </section>
  </header>
</template>


<script setup>
import { Icon } from '@iconify/vue';
const isScrolled = ref(false);

</script>