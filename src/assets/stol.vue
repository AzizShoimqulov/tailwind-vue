<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { tables, selectTable, getOrdersForTable, freeTable } from '../tableStore'

const router = useRouter()
const { t } = useI18n()

const showOrders = ref(false)
const activeTableId = ref(null)
const activeOrders = computed(() => activeTableId.value ? getOrdersForTable(activeTableId.value) : [])

const handleTableClick = (table) => {
  if (table.status === 'occupied') {
    activeTableId.value = table.id
    showOrders.value = true
    return
  }
  selectTable(table.id)
  router.push({ path: '/Menu', query: { table_id: table.id } })
}

function closeOrders() {
  showOrders.value = false
  activeTableId.value = null
}

function handleFreeTable() {
  if (!activeTableId.value) return
  freeTable(activeTableId.value)
  closeOrders()
}

const getStatusColor = (status) => {
  return status === 'available'
    ? 'bg-white border-gray-200 text-gray-800 hover:border-[#F4EDDD] hover:bg-blue-50'
    : 'bg-red-100 border-red-500 text-red-800'
}

const formatPrice = (p) => {
  try { return new Intl.NumberFormat('uz-UZ').format(Number(p)) + " so'm" } catch { return p }
}
</script>

<template>
  <div class="min-h-screen mt-20 bg-gray-50 p-8">
    <header class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-800">{{ t('tables.title') }}</h1>
      <p class="text-gray-500 mt-2">{{ t('tables.subtitle') }}</p>
    </header>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
      
      <div 
        v-for="table in tables" 
        :key="table.id"
        @click="handleTableClick(table)"
        :class="[
          'relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-1 flex flex-col items-center justify-center text-center h-40',
          getStatusColor(table.status)
        ]"
      >
        <div class="mb-3 p-3 bg-[#F4EDDD] rounded-full text-[#E93325]">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>

        <h2 class="text-2xl font-bold">№{{ table.id }}</h2>
        <p class="text-sm text-gray-500 font-medium">{{ t('tables.table') }}</p>
        <div class="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-blue-400 pointer-events-none"></div>
      </div>

    </div>
    
    <div v-if="showOrders" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white rounded-xl max-w-lg w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">{{ t('tables.table') }} №{{ activeTableId }} - {{ t('tables.orders_title') }}</h3>
          <button @click="closeOrders" class="text-gray-500 hover:text-gray-800">✕</button>
        </div>
        <div v-if="activeOrders.length === 0" class="py-6 text-center text-gray-500">{{ t('tables.no_orders') }}</div>
        <div v-else class="max-h-72 overflow-y-auto pr-2">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="(o, idx) in activeOrders" :key="idx" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
              <div class="relative h-28 overflow-hidden bg-gray-100">
                <img v-if="o.image" :src="o.image" :alt="o.name" class="w-full h-full object-cover" @error="$event.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(t('tables.no_image'))" />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">{{ t('tables.no_image') }}</div>
              </div>
              <div class="p-3 flex flex-col flex-grow">
                <div class="flex justify-between items-start gap-2">
                  <div class="text-sm font-bold text-gray-800 line-clamp-1">{{ o.name }}</div>
                  <div v-if="o.qty" class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">x{{ o.qty }}</div>
                </div>
                <div class="text-xs text-gray-500 line-clamp-2 mt-1">{{ o.description || '' }}</div>
                <div class="mt-auto pt-3 flex items-center justify-between">
                  <div class="text-sm text-gray-400 uppercase tracking-wider">{{ t('tables.total') }}</div>
                  <div class="text-lg font-bold text-[#E93325]">{{ formatPrice((o.originalPrice || 0) * (o.qty || 1)) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="handleFreeTable" class="px-3 py-2 bg-red-100 text-red-600 rounded">{{ t('tables.free') }}</button>
          <button @click="closeOrders" class="px-3 py-2 bg-gray-100 rounded">{{ t('tables.close') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
