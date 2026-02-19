import { ref, watch } from 'vue'

const TABLES_KEY = 'restaurant_tables_data'
const ORDERS_KEY = 'restaurant_orders_data'

const loadTables = () => {
  const stored = localStorage.getItem(TABLES_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Stol ma\'lumotlarini o\'qishda xatolik', e)
    }
  }
  return Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `${index + 1}-Stol`,
    status: 'available',
    occupiedAt: null
  }))
}

const loadOrders = () => {
  const stored = localStorage.getItem(ORDERS_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Buyurtma ma\'lumotlarini o\'qishda xatolik', e)
    }
  }
  return {}
}

export const tables = ref(loadTables())
export const tableOrders = ref(loadOrders())
export const selectedTable = ref(null)



watch(tables, (newVal) => {
  localStorage.setItem(TABLES_KEY, JSON.stringify(newVal))
}, { deep: true })

watch(tableOrders, (newVal) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(newVal))
}, { deep: true })



export function selectTable(id) {
  selectedTable.value = id
}

export function occupyTable(id) {
  const t = tables.value.find(x => x.id === id)
  if (t) {
    t.status = 'occupied'
    if (!t.occupiedAt) {
      t.occupiedAt = new Date().toISOString()
    }
  }
}

export function freeTable(id) {
  const t = tables.value.find(x => x.id === id)
  if (t) {
    t.status = 'available'
    t.occupiedAt = null
    
    if (tableOrders.value[id]) {
      delete tableOrders.value[id]
    }
  }
}

export function addOrderToTable(id, items) {
  if (!id) return
  
  if (!tableOrders.value[id]) {
    tableOrders.value[id] = []
  }
  
  items.forEach(i => {
    const itemId = i.id
    if (!itemId) {
      tableOrders.value[id].push({ ...i })
      return
    }
    
    const existing = tableOrders.value[id].find(x => x.id === itemId)
    if (existing) {
      existing.qty = (existing.qty || 1) + (i.qty || 1)
    } else {
      tableOrders.value[id].push({ ...i, qty: i.qty || 1 })
    }
  })
}

export function getOrdersForTable(id) {
  return tableOrders.value[id] || []
}

export default {
  tables,
  tableOrders,
  selectedTable,
  selectTable,
  occupyTable,
  freeTable,
  addOrderToTable,
  getOrdersForTable
}