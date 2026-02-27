<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { state } from '../tableStore'
import { tables, getOrdersForTable, freeTable as freeTableStore } from '../tableStore'

const filterStatus = ref('all') 
const showModal = ref(false)
const selectedTable = ref(null)
const tableOrders = computed(() => selectedTable.value ? getOrdersForTable(selectedTable.value.id) : [])

const filteredTables = computed(() => {
  const list = [...tables.value]

  if (filterStatus.value === 'all') {
    return list.sort((a, b) => Number(a.id) - Number(b.id))
  }

  const filtered = list.filter(t => t.status === filterStatus.value)

  if (filterStatus.value === 'occupied') {
    return filtered.sort((a, b) => {
      const aTime = a.occupiedAt ? new Date(a.occupiedAt).getTime() : 0
      const bTime = b.occupiedAt ? new Date(b.occupiedAt).getTime() : 0
      return bTime - aTime
    })
  }

  return filtered.sort((a, b) => Number(a.id) - Number(b.id))
})

const totalTables = computed(() => tables.value.length)
const occupiedCount = computed(() => tables.value.filter(t => t.status === 'occupied').length)
const availableCount = computed(() => totalTables.value - occupiedCount.value)

const modalTotalSum = computed(() => {
  return tableOrders.value.reduce((sum, item) => {
    const price = Number(item.price ?? item.originalPrice) || 0
    const qty = Number(item.qty) || 1
    return sum + price * qty
  }, 0)
})

const openOrderModal = (table) => {
  selectedTable.value = table
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  setTimeout(() => {
    selectedTable.value = null
  }, 300)
}

const handleFreeTable = (id) => {
  if(confirm(`№${id}-stolni bo'shatmoqchimisiz?`)) {
    freeTableStore(id)
    if (selectedTable.value?.id === id) closeModal()
  }
}

const formatPrice = (p) => {
  return new Intl.NumberFormat('uz-UZ').format(p) + " so'm"
}

const getTableTotal = (tableId) => {
  const orders = getOrdersForTable(tableId)
  return orders.reduce((sum, item) => {
    const price = Number(item.price ?? item.originalPrice) || 0
    const qty = Number(item.qty) || 1
    return sum + price * qty
  }, 0)
}

const formatTime = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
    <div class="max-w-7xl mx-auto">
      
      <header class="mb-8">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Icon icon="mdi:monitor-dashboard" class="text-blue-600" />
          Restoran Boshqaruv Paneli
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Jami Stollar</p>
              <p class="text-3xl font-bold text-gray-800">{{ totalTables }}</p>
            </div>
            <div class="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Icon icon="mdi:table-furniture" class="w-8 h-8" />
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Band qilingan</p>
              <p class="text-3xl font-bold text-red-500">{{ occupiedCount }}</p>
            </div>
            <div class="p-3 bg-red-50 text-red-500 rounded-xl">
              <Icon icon="mdi:account-group" class="w-8 h-8" />
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Bo'sh joylar</p>
              <p class="text-3xl font-bold text-green-500">{{ availableCount }}</p>
            </div>
            <div class="p-3 bg-green-50 text-green-500 rounded-xl">
              <Icon icon="mdi:check-circle" class="w-8 h-8" />
            </div>
          </div>
        </div>
      </header>

      <div class="flex flex-wrap gap-2 mb-6">
        <button 
          v-for="stat in ['all', 'available', 'occupied']" 
          :key="stat"
          @click="filterStatus = stat"
          class="px-5 py-2 rounded-full text-sm font-bold transition-all"
          :class="filterStatus === stat ? 'bg-gray-800 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-200'"
        >
          {{ stat === 'all' ? 'Barchasi' : (stat === 'available' ? "Bo'sh" : "Band") }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="table in filteredTables" 
          :key="table.id"
          class="bg-white rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col overflow-hidden"
          :class="table.status === 'occupied' ? 'border-red-200' : 'border-gray-200'"
        >
          <div 
            class="p-4 flex justify-between items-start border-b border-gray-50"
            :class="table.status === 'occupied' ? 'bg-red-50/50' : ''"
          >
            <div>
              <h3 class="text-lg font-bold text-gray-800">№{{ table.id }} Stol</h3>
              <p class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Icon icon="mdi:clock-outline" v-if="table.status === 'occupied'" />
                {{ table.status === 'occupied' ? formatTime(table.occupiedAt) + ' da band qilindi' : 'Hozircha bo\'sh' }}
              </p>
            </div>
            <span 
              class="px-2 py-1 text-xs font-bold uppercase rounded-md"
              :class="table.status === 'occupied' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'"
            >
              {{ table.status === 'occupied' ? 'Band' : 'Bo\'sh' }}
            </span>
          </div>

          <div class="p-4 flex-1 flex flex-col justify-end gap-3">
             <div v-if="table.status === 'occupied'" class="mb-2">
                <div v-if="getOrdersForTable(table.id).length === 0" class="text-sm text-gray-400 italic">
                  Hozircha buyurtmalar yo'q
                </div>
                <div v-else class="space-y-2">
                  <div class="max-h-28 overflow-y-auto custom-scrollbar rounded-lg border border-gray-100 bg-gray-50 p-2 space-y-1">
                    <div
                      v-for="(item, idx) in getOrdersForTable(table.id)"
                      :key="idx"
                      class="flex items-center justify-between gap-2 text-xs"
                    >
                      <div class="flex items-center gap-2 min-w-0">
                        <div class="w-8 h-8 rounded-md bg-white border border-gray-200 overflow-hidden shrink-0">
                          <img
                            v-if="item.image"
                            :src="item.image"
                            class="w-full h-full object-cover"
                            @error="$event.target.src='https://via.placeholder.com/150'"
                          />
                          <div v-else class="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                            <Icon icon="mdi:image-off" />
                          </div>
                        </div>
                        <span class="text-gray-700 truncate">{{ item.name }}</span>
                      </div>
                      <span class="font-bold text-gray-800 shrink-0">{{ item.qty || 1 }}x</span>
                    </div>
                  </div>
                  <div class="text-xs font-semibold text-gray-700">
                    Jami: <span class="text-[#E93325]">{{ formatPrice(getTableTotal(table.id)) }}</span>
                  </div>
                </div>
             </div>
             <div v-else class="text-sm text-gray-400 italic mb-2">
                Buyurtma yo'q
             </div>

             <div class="grid grid-cols-2 gap-2 mt-auto">
               <button
                 v-if="table.status === 'occupied'"
                 class="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
               >
                 <Icon icon="mdi:printer" /> Chek chiqarish
               </button>

               <button 
                 v-if="table.status === 'occupied'"
                 @click="handleFreeTable(table.id)"
                 class="flex items-center justify-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 text-xs font-bold rounded-lg transition-colors col-span-1"
               >
                 <Icon icon="mdi:lock-open-variant" /> Bo'shatish
               </button>

               <div v-else class="col-span-2 text-center text-xs text-gray-400 py-2 bg-gray-50 rounded-lg">
                 Mijoz kutilmoqda...
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        
        <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          <div class="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 class="text-xl font-bold text-gray-800">№{{ selectedTable?.id }} - Stol hisobi</h2>
              <p class="text-xs text-gray-500">Buyurtmalar ro'yxati</p>
            </div>
            <button @click="closeModal" class="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors">
              <Icon icon="mdi:close" class="text-gray-600" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div v-if="tableOrders.length === 0" class="text-center py-10 text-gray-400 flex flex-col items-center">
              <Icon icon="mdi:cart-off" class="w-12 h-12 mb-2 opacity-50" />
              <p>Hozircha buyurtmalar yo'q</p>
            </div>

            <div v-else class="space-y-3">
              <div v-for="(item, idx) in tableOrders" :key="idx" class="flex gap-3 bg-white p-2 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                <div class="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                  <img 
                    v-if="item.image" 
                    :src="item.image" 
                    class="w-full h-full object-cover" 
                    @error="$event.target.src='https://via.placeholder.com/150'" 
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                    <Icon icon="mdi:image-off" />
                  </div>
                </div>
                <div class="flex-1 flex flex-col justify-center">
                  <h4 class="font-bold text-gray-800 text-sm line-clamp-1">{{ item.name }}</h4>
                  <div class="flex justify-between items-center mt-1">
                      <span class="text-xs text-gray-500">{{ item.qty || 1 }} x {{ formatPrice(Number(item.price ?? item.originalPrice) || 0) }}</span>
                      <span class="font-bold text-[#E93325] text-sm">{{ formatPrice((Number(item.price ?? item.originalPrice) || 0) * (Number(item.qty) || 1)) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 bg-gray-50 border-t border-gray-100">
            <div class="flex justify-between items-center mb-4 text-lg">
              <span class="font-bold text-gray-700">Jami summa:</span>
              <span class="font-extrabold text-[#E93325] text-xl">{{ formatPrice(modalTotalSum) }}</span>
            </div>
            <div class="grid grid-cols-2 gap-3">
               <button @click="handleFreeTable(selectedTable.id)" class="py-3 rounded-xl bg-red-100 text-red-600 font-bold text-sm hover:bg-red-200 transition-colors">
                 Hisobni yopish
               </button>
               <button class="py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                 <Icon icon="mdi:printer" /> Chek chiqarish
               </button>
            </div>
          </div>

        </div>
      </div>
    </transition>

  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
