<template>
  <div class="w-full bg-gray-100 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-[1400px] mx-auto text-center">
      
      <p 
        class="font-sans font-bold text-[#E93325] uppercase tracking-wider mb-4 
               text-sm sm:text-base md:text-lg lg:text-xl
               animate-fade-up"
      >
        Türk mutfağının en lezzetli yemeklerini sunuyoruz
      </p>

      <h1 
        class="font-sans font-extrabold text-gray-800 leading-tight
               text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl
               max-w-4xl mx-auto"
      >
        Biz sizga turk taomlaridan bahramand bo‘lishning 
        <span class="text-[#E93325]">eng mazali</span> va qulay usulini taklif qilamiz.
      </h1>

      <div class="w-24 h-1.5 bg-[#E93325] mx-auto mt-8 rounded-full opacity-80"></div>

    </div>
  </div>
</template>

<script setup>
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