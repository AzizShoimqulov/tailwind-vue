<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
    
    <div class="max-w-md w-full text-center space-y-8">
      
      <div class="relative">
         <h1 class="text-9xl font-extrabold text-gray-200 tracking-widest">
          {{ error.statusCode }}
        </h1>
        
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="bg-[#E93325] text-white px-3 py-1 text-sm font-bold rounded rotate-12 shadow-lg">
            {{ t('error_page.badge') }}
          </span>
        </div>
      </div>

      <div class="mt-4">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          {{ errorMessage }}
        </h2>
        <p class="mt-2 text-base md:text-lg text-gray-500">
          {{ t('error_page.description') }}
        </p>
      </div>

      <div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        
        <button 
          @click="handleClearError" 
          class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-md text-[#E93325] bg-[#F4EDDD] hover:bg-[#E93325] hover:text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {{ t('error_page.home') }}
        </button>

        <button 
          @click="goBack"
          class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto shadow-sm"
        >
          {{ t('error_page.back') }}
        </button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  error: {
    type: Object,
    default: () => ({ statusCode: 404 })
  }
})

const router = useRouter()
const { t } = useI18n()

const errorMessage = computed(() => {
  if (props.error.statusCode === 404) {
    return t('error_page.not_found')
  } else if (props.error.statusCode === 500) {
    return t('error_page.server_error')
  }
  return t('error_page.unknown')
})

const handleClearError = () => {
  router.push('/')
}

const goBack = () => {
  window.history.back()
}
</script>
