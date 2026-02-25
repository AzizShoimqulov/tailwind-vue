<template>
  <section class="min-h-screen pt-28 sm:pt-32 pb-10 px-4 bg-gray-50">
    <div class="max-w-3xl mx-auto">
      <div class="mb-4">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">Meal details</h1>
        <p class="text-sm text-gray-500 mt-1">ID: {{ id }}</p>
      </div>

      <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        Error loading meal: {{ errorMessage }}
      </div>

      <div v-else-if="meal" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <img
          v-if="meal.image"
          :src="meal.image"
          :alt="meal.name"
          class="w-full h-64 object-cover"
        />
        <div class="p-5 sm:p-6">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900">{{ meal.name }}</h2>
          <p class="mt-3 text-gray-600">{{ meal.description || 'No description' }}</p>
          <p class="mt-4 text-lg font-semibold text-[#E93325]">Price: {{ meal.price }}</p>
        </div>
      </div>

      <div v-else class="rounded-xl border border-gray-200 bg-white p-4 text-gray-600">
        Loading...
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const id = route.params.id
const meal = ref(null)
const error = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const res = await axios.get(`https://beyoglu-karshi.uz/api/api/meals/${id}`)
    const payload = res.data
    meal.value = payload?.meal || payload?.data || payload
  } catch (err) {
    error.value = true
    if (err.response) {
      errorMessage.value = `Status ${err.response.status}: ${err.response.statusText}`
    } else {
      errorMessage.value = err.message
    }
    console.error('Failed to load meal', err)
  }
})
</script>

<style scoped>
</style>
