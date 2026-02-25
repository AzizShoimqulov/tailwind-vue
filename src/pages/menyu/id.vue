
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const meal = ref(null)
const loading = ref(true)
const error = ref(null)

const mealId = route.params.id

const formatPrice = (p) => {
  try { 
    return new Intl.NumberFormat('uz-UZ').format(p) + " so'm" 
  } catch { 
    return p 
  }
}

const fetchMealById = async () => {
  try {
    loading.value = true
    const res = await fetch('https://beyoglu-karshi.uz/api/api/meals')
    
    if (!res.ok) {
      throw new Error(`HTTP xatolik: ${res.status}`)
    }
    
    const data = await res.json()

    if (data && Array.isArray(data.meals)) {
      const foundMeal = data.meals.find(item => item.id == mealId)

      if (foundMeal) {
        let fixedImage = foundMeal.image;
        if (fixedImage) {
          fixedImage = fixedImage.replace('http://localhost:5000', 'https://beyoglu-karshi.uz/api');
        }
        
        meal.value = {
          ...foundMeal,
          image: fixedImage
        }
      } else {
        throw new Error(t('meal.not_found'))
      }
    } else {
      throw new Error(t('meal.bad_format'))
    }
  } catch (e) {
    console.error("Xatolik:", e)
    error.value = t('meal.load_error')
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back() 
}

onMounted(() => {
  fetchMealById()
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[50vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#E93325] border-t-transparent"></div>
      <p class="mt-4 text-gray-500 font-medium">{{ t('meal.loading') }}</p>
    </div>

    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <p class="text-xl font-bold text-red-500 mb-4">{{ error }}</p>
      <button @click="goBack" class="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300">
        {{ t('meal.back') }}
      </button>
    </div>

    <div v-else class="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      
      <div class="relative h-[300px] sm:h-[400px] md:h-[500px]">
        <button 
          @click="goBack" 
          class="absolute top-4 left-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <img
          v-if="meal.image"
          :src="meal.image"
          :alt="meal.name"
          class="w-full h-full object-cover"
          @error="$event.target.src = 'https://via.placeholder.com/800x600?text=' + encodeURIComponent(t('tables.no_image'))"
        />
        <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xl">
          {{ t('tables.no_image') }}
        </div>
      </div>
      <div class="p-6 sm:p-10">
        <div class="flex flex-col md:flex-row justify-between items-start gap-6">
          
          <div class="flex-1">
            <span v-if="meal.category_info" class="inline-block bg-red-50 text-[#E93325] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-red-100">
              {{ meal.category_info.name }}
            </span>

            <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {{ meal.name }}
            </h1>

            <div class="prose prose-lg text-gray-600 mb-8">
              <p>{{ meal.description || t('meal.no_description') }}</p>
            </div>
          </div>
          <div class="w-full md:w-80 bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-4">
            <p class="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wide">{{ t('meal.total_price') }}</p>
            <p class="text-3xl font-bold text-[#E93325] mb-6">{{ formatPrice(meal.price) }}</p>
            <p class="text-xs text-gray-400 text-center mt-4">
              {{ t('meal.delivery_available') }}
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
