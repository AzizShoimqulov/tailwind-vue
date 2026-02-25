<template>
  <div class="w-full bg-gray-50 pt-12 md:pt-16 lg:pt-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-[1400px] mx-auto text-center">
      
      <p 
        class="font-sans font-bold text-[#E93325] uppercase tracking-wider mb-4 
               text-sm sm:text-base md:text-lg lg:text-xl
               animate-fade-up"
      >
        {{ t('categories.lead') }}
      </p>

      <h1 
        class="font-sans font-extrabold text-gray-800 leading-tight
               text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl
               max-w-4xl mx-auto"
      >
        {{ t('categories.title_prefix') }} 
        <span class="text-[#E93325]">{{ t('categories.title_highlight') }}</span> {{ t('categories.title_suffix') }}
      </h1>

      <div class="w-24 h-1.5 bg-[#E93325] mx-auto mt-8 rounded-full opacity-80"></div>

    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
}
</style>
