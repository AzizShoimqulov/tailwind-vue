<template>
  <div class="max-w-[1100px] mx-auto px-4 py-8">
    <div v-if="loading" class="text-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-4 border-[#E93325] border-t-transparent mx-auto"></div>
      <p class="mt-4 text-gray-500">Yuklanmoqda...</p>
    </div>

    <div v-else-if="error" class="text-center py-20 text-red-500">
      <p class="text-xl font-bold">{{ error }}</p>
    </div>

    <div v-else-if="!meal" class="text-center py-20 text-gray-500">
      <p class="text-lg">Mahsulot topilmadi</p>
    </div>

    <div v-else class="bg-white rounded-2xl shadow-md overflow-hidden md:flex md:gap-6">
      <div class="md:w-1/2 bg-gray-100 h-64 md:h-auto">
        <img :src="meal.image || placeholder" :alt="meal.name" class="w-full h-full object-cover" @error="onImgError" />
      </div>
      <div class="p-6 md:w-1/2 flex flex-col">
        <h1 class="text-2xl font-bold mb-2">{{ meal.name }}</h1>
        <p class="text-gray-600 mb-4">{{ meal.description }}</p>
        <div class="mt-auto">
          <div class="flex items-center justify-between mb-4">
            <div>
              <div class="text-sm text-gray-500">Narx</div>
              <div class="text-2xl font-extrabold text-[#E93325]">{{ formatPrice(meal.price) }}</div>
            </div>
            <div>
              <button @click="add" class="bg-[#F4EDDD] text-[#E93325] px-5 py-2 rounded-lg font-semibold hover:bg-[#E93325] hover:text-white transition">Qo'shish</button>
            </div>
          </div>
          <router-link to="/menyu" class="text-sm text-gray-500">Orqaga menyuga</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { addToCart } from '../../cartStore'

const props = defineProps({ id: { type: [String, Number], required: true } })
const id = props.id

const meal = ref(null)
const loading = ref(true)
const error = ref(null)
const placeholder = 'https://via.placeholder.com/600x400?text=Rasm+yoq'

const fetchMeal = async (mealId) => {
  loading.value = true
  error.value = null
  meal.value = null
  try {
    const res = await fetch('https://beyoglu-karshi.uz/api/api/meals')
    if (!res.ok) throw new Error('Server javob bermadi: ' + res.status)
    const data = await res.json()
    const items = data.meals || []
    meal.value = items.find(m => String(m.id) === String(mealId)) || null
  } catch (e) {
    error.value = 'Menyu ma\'lumotlarini olishda xatolik'
    console.error(e)
  } finally {
    loading.value = false
  }
}

const formatPrice = (p) => {
  try { return new Intl.NumberFormat('uz-UZ').format(p) + " so'm" } catch { return p }
}

const add = () => {
  if (!meal.value) return
  addToCart({ id: meal.value.id, name: meal.value.name, price: formatPrice(meal.value.price), image: meal.value.image })
}

const onImgError = (e) => { e.target.src = placeholder }

onMounted(() => {
  fetchMeal(id)
})

// if route param changes, refetch
watch(() => props.id, (newId) => {
  fetchMeal(newId)
})
</script>

<style scoped>
</style>
