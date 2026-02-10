<template>
  <div class="max-w-[1100px] mx-auto px-4 py-8">
    <div v-if="loading" class="text-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-4 border-[#E93325] border-t-transparent mx-auto"></div>
      <p class="mt-4 text-gray-500">Yuklanmoqda...</p>
    </div>
    <div v-else-if="error" class="text-center py-20">
      <p class="text-xl font-bold text-red-500 mb-4">{{ error }}</p>
      <router-link to="/menyu" class="text-[#E93325] underline">Menyuga qaytish</router-link>
    </div>
    <div v-else-if="!meal" class="text-center py-20 text-gray-500">
      <p class="text-lg">Mahsulot topilmadi</p>
      <router-link to="/menyu" class="mt-4 inline-block text-[#E93325]">Orqaga qaytish</router-link>
    </div>
    <div v-else class="bg-white rounded-2xl shadow-md overflow-hidden md:flex md:gap-6">
      <div class="md:w-1/2 bg-gray-100 h-64 md:h-auto">
        <img 
          :src="meal.image || placeholder" 
          :alt="meal.name" 
          class="w-full h-full object-cover" 
          @error="onImgError" 
        />
      </div>
      
      <div class="p-6 md:w-1/2 flex flex-col">
        <h1 class="text-2xl font-bold mb-2">{{ meal.name }}</h1>
        <p class="text-gray-600 mb-6 leading-relaxed">{{ meal.description }}</p>
        
        <div class="mt-auto">
          <div class="flex items-center justify-between mb-6">
            <div>
              <div class="text-sm text-gray-500 uppercase tracking-wider">Narxi</div>
              <div class="text-2xl font-extrabold text-[#E93325]">{{ formatPrice(meal.price) }}</div>
            </div>
            <button 
              @click="add" 
              class="bg-[#F4EDDD] text-[#E93325] px-8 py-3 rounded-xl font-bold hover:bg-[#E93325] hover:text-white transition-all active:scale-95"
            >
              Savatchaga qo'shish
            </button>
          </div>
          
          <router-link to="/menyu" class="flex items-center text-sm text-gray-400 hover:text-gray-600 transition">
            <span class="mr-1">←</span> Orqaga menyuga
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { addToCart } from '../../cartStore'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const meal = ref(null)
const loading = ref(true)
const error = ref(null)
const placeholder = 'https://via.placeholder.com'

const fetchMeal = async (mealId) => {
  loading.value = true
  error.value = null
  
  try {
    const res = await fetch('https://beyoglu-karshi.uz')
    if (!res.ok) throw new Error('Tarmoq xatosi: Server javob bermadi')
    
    const data = await res.json()
    const items = data.meals || []
    
    const foundMeal = items.find(m => String(m.id) === String(mealId))
    
    if (foundMeal) {
      meal.value = foundMeal
    } else {
      meal.value = null
    }
  } catch (e) {
    error.value = "Ma'lumotlarni yuklashda xatolik yuz berdi"
    console.error("Fetch error:", e)
  } finally {
    loading.value = false
  }
}

const formatPrice = (p) => {
  if (!p) return "0 so'm"
  return new Intl.NumberFormat('uz-UZ').format(p) + " so'm"
}

const add = () => {
  if (!meal.value) return
  
  addToCart({
    id: meal.value.id,
    name: meal.value.name,
    price: Number(meal.value.price), 
    image: meal.value.image
  })
}

const onImgError = (e) => {
  e.target.src = placeholder
}

onMounted(() => {
  fetchMeal(props.id)
})

watch(() => props.id, (newId) => {
  fetchMeal(newId)
})
</script>