<script setup>
import { ref, onMounted, computed } from 'vue'
import { searchTerm } from './searchStore' 

// --- State ---
const meals = ref([])
const loading = ref(true)
const error = ref(null)
const activeCategory = ref('Barchasi') 

// --- API Fetch ---
const fetchMeals = async () => {
  try {
    loading.value = true
    const response = await fetch('https://beyoglu-karshi.uz/api/api/meals')
    
    if (!response.ok) {
      throw new Error(`HTTP xato! Status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.success && Array.isArray(data.meals)) {
      meals.value = data.meals
    } else {
      throw new Error("Ma'lumotlar formati noto'g'ri")
    }
  } catch (err) {
    console.error("Xatolik yuz berdi:", err)
    error.value = "Menyuni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
  } finally {
    loading.value = false
  }
}

// --- Computed Properties ---

// 1. Unikal kategoriyalarni ajratib olish
const categories = computed(() => {
  const cats = new Set(meals.value.map(item => item.category_info?.name || 'Boshqa'))
  return ['Barchasi', ...Array.from(cats)]
})

// 2. Filterlash (Qidiruv + Kategoriya)
const filteredItems = computed(() => {
  let items = meals.value

  // Kategoriya bo'yicha filter
  if (activeCategory.value !== 'Barchasi') {
    items = items.filter(item => (item.category_info?.name || 'Boshqa') === activeCategory.value)
  }

  // Search input bo'yicha filter
  const q = (searchTerm.value || '').toString().trim().toLowerCase()
  if (q) {
    items = items.filter(item => item.name.toLowerCase().includes(q))
  }

  return items
})

// --- Helper Functions ---

// Narxni chiroyli formatlash
const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
}

// Komponent yuklanganda ishga tushadi
onMounted(() => {
  fetchMeals()
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8" id="menu">
    <div class="max-w-[1400px] mx-auto">
      
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center uppercase tracking-wide">
        Bizning Menyular
      </h2>

      <!-- Kategoriyalar Filtr Buttons -->
      <div v-if="!loading && !error" class="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="activeCategory = cat"
          class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border"
          :class="activeCategory === cat 
            ? 'bg-[#E93325] text-white border-[#E93325] shadow-lg scale-105' 
            : 'bg-white text-gray-600 border-gray-200 hover:border-[#E93325] hover:text-[#E93325]'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Loading holati -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#E93325] border-t-transparent"></div>
        <p class="mt-4 text-gray-500 font-medium">Menyu yuklanmoqda...</p>
      </div>

      <!-- Xatolik holati -->
      <div v-else-if="error" class="text-center py-20 text-red-500">
        <p class="text-xl font-bold">⚠️ {{ error }}</p>
        <button @click="fetchMeals" class="mt-4 px-6 py-2 bg-gray-200 rounded hover:bg-gray-300">Qayta urinish</button>
      </div>

      <!-- Bo'sh natija holati -->
      <div v-else-if="filteredItems.length === 0" class="text-center py-20 text-gray-500">
        <p class="text-lg">Hech narsa topilmadi 😔</p>
      </div>

      <!-- Asosiy Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        
        <div 
          v-for="item in filteredItems" 
          :key="item.id" 
          class="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
        >
          <!-- Rasm Qismi -->
          <div class="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
            <img 
              v-if="item.image"
              :src="item.image" 
              :alt="item.name" 
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              @error="$event.target.src = 'https://via.placeholder.com/400x300?text=Rasm+yoq'" 
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              Rasm yo'q
            </div>
            
            <span v-if="item.category_info" class="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#E93325] text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md">
              {{ item.category_info.name }}
            </span>
          </div>

          <!-- Matn Qismi -->
          <div class="p-4 sm:p-6 flex flex-col flex-grow">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 line-clamp-1 group-hover:text-[#E93325] transition-colors">
              {{ item.name }}
            </h3>
            
            <p class="text-gray-500 text-xs sm:text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
              {{ item.description || '' }}
            </p>

            <div class="mt-auto pt-4 border-t border-gray-100">
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-400 font-medium uppercase tracking-wider">Narx</span>
                <span class="text-xl sm:text-2xl font-bold text-gray-900 whitespace-nowrap">
                  {{ formatPrice(item.price) }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>