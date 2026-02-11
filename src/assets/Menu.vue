<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { searchTerm } from '../searchStore'
import { useRouter } from 'vue-router'
import { addToCart } from '../cartStore'

const { t } = useI18n()
const router = useRouter()

const meals = ref([])
const loading = ref(true)
const error = ref(null)
const activeCategory = ref(null)

const fetchMeals = async () => {
  try {
    loading.value = true
    const res = await fetch('https://beyoglu-karshi.uz/api/api/meals')
    if (!res.ok) throw new Error(`HTTP xatolik: ${res.status}`)
    const data = await res.json()

    if (data && Array.isArray(data.meals)) {
      meals.value = data.meals.map(item => {
        let fixedImage = item.image;
        if (fixedImage) {
          fixedImage = fixedImage.replace('http://localhost:5000', 'https://beyoglu-karshi.uz/api');
        }
        return { ...item, image: fixedImage }
      })
    } else {
      throw new Error("Ma'lumotlar formati noto'g'ri")
    }
    } catch (e) {
    console.error("Xatolik:", e)
    error.value = t('menu.load_error')
  } finally {
    loading.value = false
  }
}

const openMeal = (item) => {
  router.push({ name: 'Meal', params: { id: item.id } })
}

const getUnifiedCategory = (originalName) => {
  if (!originalName) return t('menu.other');
  const name = originalName.toLowerCase();
  if (name.includes('ichimlik') || name.includes('choy') || name.includes('tea') || name.includes('kofe') || name.includes('coffee')) return 'Ichimliklar';
  if (name.includes('birinchi') || name.includes('shurva') || name.includes('mastava')) return 'Birinchi ovqatlar';
  if (name.includes('shirinlik') || name.includes('desert') || name.includes('tort') || name.includes('muzqaymoq')) return 'Shirinliklar';
  return originalName;
}

const categories = computed(() => {
  if (!meals.value) return [{ key: null, label: t('menu.all') }]
  const cats = Array.from(new Set(meals.value.map(i => getUnifiedCategory(i.category_info?.name)))).sort()
  return [
    { key: null, label: t('menu.all') },
    ...cats.map(c => ({ key: c, label: c }))
  ]
})

const filteredItems = computed(() => {
  let items = meals.value || []
  if (activeCategory.value !== null) {
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
const handleAddToCart = (item) => {
  const cartItem = {
    id: item.id,
    name: item.name,
    price: formatPrice(item.price),
    originalPrice: item.price,    
    image: item.image
  }
  addToCart(cartItem)
}
const formatPrice = (p) => {
  try { return new Intl.NumberFormat('uz-UZ').format(p) + " so'm" } catch { return p }
}

onMounted(() => {
  fetchMeals()
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen pt-24 pb-8 sm:pt-32 sm:pb-12 md:pt-32 md:pb-14 px-4 sm:px-6 lg:px-8" id="menu">
    <div class="max-w-[1400px] mx-auto">
      
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center uppercase tracking-wide">
        {{ t('menu.title') }}
      </h2>

      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#E93325] border-t-transparent"></div>
        <p class="mt-4 text-gray-500 font-medium">{{ t('menu.loading') }}</p>
      </div>

      <div v-else-if="error" class="text-center py-20 text-red-500">
        <p class="text-xl font-bold"> {{ error }}</p>
        <button @click="fetchMeals" class="mt-4 px-6 py-2 bg-gray-200 rounded hover:bg-gray-300">{{ t('menu.retry') }}</button>
      </div>

      <div v-else>
        <div class="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          <button 
          v-for="cat in categories" 
          :key="cat.key"
          @click="activeCategory = cat.key"
          class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border"
          :class="activeCategory === cat.key 
            ? 'bg-[#E93325] text-white border-[#E93325] shadow-lg scale-105' 
            : 'bg-white text-gray-600 border-gray-200 hover:border-[#E93325] hover:text-[#E93325]'"
        >
          {{ cat.label }}
        </button>
      </div>

        <div v-if="filteredItems.length === 0" class="text-center py-20 text-gray-500">
          <p class="text-lg">{{ t('menu.no_results') }}</p>
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
                @error="$event.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(t('menu.no_image'))"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">{{ t('menu.no_image') }}</div>
              
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
              <div class="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 gap-2">
              <div class="flex flex-col">
                <span class="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wider">{{ t('menu.price') }}</span>
                <span class="text-xl sm:text-2xl font-bold text-gray-900 whitespace-nowrap">
                  {{ formatPrice(item.price) }}
                </span>
              </div>
              
              <button 
                @click="handleAddToCart(item)"
                class="flex items-center justify-center gap-1.5 sm:gap-2 bg-[#F4EDDD] text-[#E93325] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-[#E93325] hover:text-white transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md text-sm sm:text-base w-full sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{{ t('menu.add') }}</span>
              </button>
            </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>