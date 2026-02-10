<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Router va Route ni chaqiramiz
const route = useRoute()
const router = useRouter()

// O'zgaruvchilar
const meal = ref(null)
const loading = ref(true)
const error = ref(null)

// URL dan ID ni olamiz (masalan: /meals/5 bo'lsa, id = 5)
const mealId = route.params.id

// Narxni formatlash funksiyasi
const formatPrice = (p) => {
  try { 
    return new Intl.NumberFormat('uz-UZ').format(p) + " so'm" 
  } catch { 
    return p 
  }
}

// Bitta ovqatni yuklash funksiyasi
const fetchMealById = async () => {
  try {
    loading.value = true
    
    // API dan barcha ovqatlarni olamiz
    const res = await fetch('https://beyoglu-karshi.uz/api/api/meals')
    
    if (!res.ok) {
      throw new Error(`HTTP xatolik: ${res.status}`)
    }
    
    const data = await res.json()

    if (data && Array.isArray(data.meals)) {
      // Kelgan ro'yxatdan bizga kerakli ID dagi ovqatni qidiramiz
      // Diqqat: ID solishtirishda string/number farqiga ehtiyot bo'lish uchun == ishlatildi
      const foundMeal = data.meals.find(item => item.id == mealId)

      if (foundMeal) {
        // Rasmni to'g'rilash (sizning eski kodingizdan)
        let fixedImage = foundMeal.image;
        if (fixedImage) {
          fixedImage = fixedImage.replace('http://localhost:5000', 'https://beyoglu-karshi.uz/api');
        }
        
        // Topilgan ovqatni o'zgaruvchiga yozamiz
        meal.value = {
          ...foundMeal,
          image: fixedImage
        }
      } else {
        throw new Error("Bunday ovqat topilmadi")
      }
    } else {
      throw new Error("Ma'lumotlar formati noto'g'ri")
    }
  } catch (e) {
    console.error("Xatolik:", e)
    error.value = 'Ma\'lumotni yuklashda xatolik yuz berdi yoki ovqat topilmadi.'
  } finally {
    loading.value = false
  }
}

// Ortga qaytish funksiyasi
const goBack = () => {
  router.back() // Yoki router.push('/') qilsangiz ham bo'ladi
}

onMounted(() => {
  fetchMealById()
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
    
    <!-- Yuklanish holati -->
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[50vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#E93325] border-t-transparent"></div>
      <p class="mt-4 text-gray-500 font-medium">Yuklanmoqda...</p>
    </div>

    <!-- Xatolik holati -->
    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <p class="text-xl font-bold text-red-500 mb-4">{{ error }}</p>
      <button @click="goBack" class="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Ortga qaytish
      </button>
    </div>

    <!-- Asosiy kontent -->
    <div v-else class="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      
      <!-- Yuqoridagi navigatsiya va rasm -->
      <div class="relative h-[300px] sm:h-[400px] md:h-[500px]">
        <!-- Ortga qaytish tugmasi -->
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
          @error="$event.target.src = 'https://via.placeholder.com/800x600?text=Rasm+yoq'"
        />
        <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xl">
          Rasm mavjud emas
        </div>
      </div>

      <!-- Ma'lumotlar qismi -->
      <div class="p-6 sm:p-10">
        <div class="flex flex-col md:flex-row justify-between items-start gap-6">
          
          <div class="flex-1">
            <!-- Kategoriya -->
            <span v-if="meal.category_info" class="inline-block bg-red-50 text-[#E93325] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-red-100">
              {{ meal.category_info.name }}
            </span>

            <!-- Nom -->
            <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {{ meal.name }}
            </h1>

            <!-- Tavsif -->
            <div class="prose prose-lg text-gray-600 mb-8">
              <p>{{ meal.description || 'Tavsif mavjud emas.' }}</p>
            </div>
          </div>

          <!-- Narx va Buyurtma bloki -->
          <div class="w-full md:w-80 bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-4">
            <p class="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wide">Jami narx</p>
            <p class="text-3xl font-bold text-[#E93325] mb-6">{{ formatPrice(meal.price) }}</p>
            
            <button class="w-full bg-gray-900 text-white py-4 px-6 rounded-xl hover:bg-[#E93325] transform hover:-translate-y-1 transition-all duration-300 font-bold shadow-lg flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Savatga qo'shish
            </button>
            
            <p class="text-xs text-gray-400 text-center mt-4">
              Yetkazib berish xizmati mavjud
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>