<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Meal details (id: {{ id }})</h1>

    <div v-if="error" class="mt-4 text-red-600">
      Error loading meal: {{ errorMessage }}
    </div>

    <div v-else-if="meal" class="mt-4">
      <h2 class="text-xl">{{ meal.name }}</h2>
      <p class="mt-2">{{ meal.description }}</p>
      <p class="mt-2 font-semibold">Price: {{ meal.price }}</p>
    </div>

    <div v-else class="mt-4">Loading...</div>
  </div>
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
    meal.value = res.data
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
/* small spacing tweaks if needed */
</style>
