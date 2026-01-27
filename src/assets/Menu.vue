
                    <script setup>
import { ref, onMounted, computed } from 'vue'
import { searchTerm } from '../searchStore'

const meals = ref([])
const loading = ref(true)
const error = ref(null)
const activeCategory = ref('Barchasi')


const selectedMeal = ref(null)

const fetchMeals = async () => {
  try {
    loading.value = true
    
    const res = await fetch('https://beyoglu-karshi.uz/api/api/meals')
    
    if (!res.ok) {
      throw new Error(`HTTP xatolik: ${res.status}`)
    }
    
    const data = await res.json()

    if (data && Array.isArray(data.meals)) {
      meals.value = data.meals.map(item => {
        let fixedImage = item.image;
        if (fixedImage) {
          fixedImage = fixedImage.replace('http://localhost:5000', 'https://beyoglu-karshi.uz/api');
        }

        return {
          ...item,
          image: fixedImage
        }
      })
    } else {
      throw new Error("Ma'lumotlar formati noto'g'ri")
    }
  } catch (e) {
    console.error("Xatolik:", e)
    error.value = 'Menyuni yuklashda xatolik yuz berdi.'
  } finally {
    loading.value = false
  }
}

const openMeal = (item) => {
  selectedMeal.value = item
  document.body.style.overflow = 'hidden'
}

const closeMeal = () => {
  selectedMeal.value = null
  document.body.style.overflow = 'auto'
}

const getUnifiedCategory = (originalName) => {
  if (!originalName) return 'Boshqa';
  const name = originalName.toLowerCase();
  if (name.includes('ichimlik') || name.includes('choy') || name.includes('tea') || name.includes('kofe') || name.includes('coffee')) return 'Ichimliklar';
  if (name.includes('birinchi') || name.includes('shurva') || name.includes('mastava')) return 'Birinchi ovqatlar';
  if (name.includes('shirinlik') || name.includes('desert') || name.includes('tort') || name.includes('muzqaymoq')) return 'Shirinliklar';
  return originalName;
}

const categories = computed(() => {
  if (!meals.value) return ['Barchasi']
  const cats = new Set(meals.value.map(i => getUnifiedCategory(i.category_info?.name)))
  return ['Barchasi', ...Array.from(cats).sort()]
})

const filteredItems = computed(() => {
  let items = meals.value || []

  if (activeCategory.value !== 'Barchasi') {
    items = items.filter(i => {
      const itemCat = getUnifiedCategory(i.category_info?.name);
      return itemCat === activeCategory.value;
    })
  }
  const q = (searchTerm?.value || '').toString().trim().toLowerCase()
  if (q) {
    items = items.filter(i => (i.name || '').toString().toLowerCase().includes(q))
  }
  return items
})

const formatPrice = (p) => {
  try { 
    return new Intl.NumberFormat('uz-UZ').format(p) + " so'm" 
  } catch { 
    return p 
  }
}

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

      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#E93325] border-t-transparent"></div>
        <p class="mt-4 text-gray-500 font-medium">Menyu yuklanmoqda...</p>
      </div>

      <div v-else-if="error" class="text-center py-20 text-red-500">
        <p class="text-xl font-bold">{{ error }}</p>
        <button @click="fetchMeals" class="mt-4 px-6 py-2 bg-gray-200 rounded hover:bg-gray-300">Qayta urinish</button>
      </div>

      <div v-else>
        <div class="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
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

        <div v-if="filteredItems.length === 0" class="text-center py-20 text-gray-500">
          <p class="text-lg">Hech narsa topilmadi</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            @click="openMeal(item)" 
            class="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full cursor-pointer"
          >
            <div class="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                @error="$event.target.src = 'https://via.placeholder.com/400x300?text=Rasm+yoq'"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">Rasm yo'q</div>
              
              <span v-if="item.category_info" class="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#E93325] text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md">
                {{ item.category_info.name }}
              </span>
            </div>
            
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

    <div v-if="selectedMeal" class="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      <div @click="closeMeal" class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      
      <div class="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden transform transition-all flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px]">
        
        <button @click="closeMeal" class="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
           <img
            v-if="selectedMeal.image"
            :src="selectedMeal.image"
            :alt="selectedMeal.name"
            class="w-full h-full object-cover"
            @error="$event.target.src = 'https://via.placeholder.com/600x600?text=Rasm+yoq'"
          />
           <div v-else class="w-full h-full flex items-center justify-center text-gray-400">Rasm yo'q</div>
        </div>

        <div class="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col overflow-y-auto">
          <span v-if="selectedMeal.category_info" class="self-start bg-red-100 text-[#E93325] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
             {{ selectedMeal.category_info.name }}
          </span>
          
          <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">{{ selectedMeal.name }}</h2>
          
          <p class="text-gray-600 leading-relaxed text-base sm:text-lg mb-6 flex-grow">
            {{ selectedMeal.description || '' }}
          </p>

          <div class="pt-6 border-t border-gray-100 mt-auto">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p class="text-sm text-gray-500 font-medium mb-1">Narxi:</p>
                <p class="text-3xl font-bold text-[#E93325]">{{ formatPrice(selectedMeal.price) }}</p>
              </div>
               <button class="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-[#E93325] transition-colors duration-300 font-semibold shadow-lg">
                 Buyurtma berish
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>