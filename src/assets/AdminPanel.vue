<template>
  <div class="min-h-screen pt-20 bg-gray-50 p-6">
    <div class="max-w-[1200px] mx-auto">
      <h1 class="text-2xl font-extrabold mb-6">Admin Panel — Stol holati</h1>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="table in tables" :key="table.id" class="p-4 bg-white rounded-lg shadow">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-sm text-gray-500">Stol</div>
              <div class="text-2xl font-bold">№{{ table.id }}</div>
            </div>
            <div class="text-right">
              <div :class="table.status === 'occupied' ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'">{{ table.status === 'occupied' ? 'Band' : 'Bo\'sh' }}</div>
              <div class="text-xs text-gray-400 mt-1">{{ table.occupiedAt ? formatDate(table.occupiedAt) : '-' }}</div>
            </div>
          </div>

          <div class="mt-4 flex gap-2">
            <button v-if="table.status === 'occupied'" @click="viewOrders(table.id)" class="px-3 py-2 bg-blue-600 text-white rounded">Buyurtmalar</button>
            <button v-if="table.status === 'occupied'" @click="freeTable(table.id)" class="px-3 py-2 bg-red-100 text-red-600 rounded">Bo'shatish</button>
            <button v-else @click="selectForTest(table.id)" class="px-3 py-2 bg-gray-100 rounded">Tanlash</button>
          </div>
        </div>
      </div>

      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="bg-white rounded-xl max-w-3xl w-full p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold">Stol №{{ modalTableId }} — Buyurtmalar</h2>
            <button @click="closeModal" class="text-gray-500">✕</button>
          </div>

          <div v-if="modalOrders.length === 0" class="text-center py-8 text-gray-500">Buyurtma topilmadi</div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(o, idx) in modalOrders" :key="idx" class="bg-white rounded-lg shadow p-3 flex gap-3 items-center">
              <img v-if="o.image" :src="o.image" :alt="o.name" class="w-20 h-16 object-cover rounded" @error="$event.target.src='https://via.placeholder.com/120x90?text=No+Image'" />
              <div class="flex-1">
                <div class="font-bold">{{ o.name }}</div>
                <div class="text-sm text-gray-500 mt-1">{{ o.description || '' }}</div>
                <div class="mt-2 flex items-center justify-between">
                  <div class="text-sm text-gray-600">Qty: {{ o.qty || 1 }}</div>
                  <div class="font-semibold text-[#E93325]">{{ formatPrice((o.originalPrice || 0) * (o.qty || 1)) }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 flex justify-end">
            <button @click="closeModal" class="px-4 py-2 bg-gray-100 rounded">Yopish</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { tables, getOrdersForTable, freeTableWithTime, selectTable } from '../tableStore'

const showModal = ref(false)
const modalOrders = ref([])
const modalTableId = ref(null)

function viewOrders(tableId) {
  modalTableId.value = tableId
  modalOrders.value = getOrdersForTable(tableId)
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  modalOrders.value = []
  modalTableId.value = null
}

function freeTable(id) {
  freeTableWithTime(id)
}
function selectForTest(id) {
  selectTable(id)
  alert('Stol ' + id + ' tanlandi (test)')
}

const formatPrice = (p) => {
  try { return new Intl.NumberFormat('uz-UZ').format(Number(p)) + " so'm" } catch { return p }
}

const formatDate = (iso) => {
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch { return iso }
}
</script>

<style scoped>
</style>
<template>

</template>


<script setup>

</script>