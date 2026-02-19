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
// store orders keyed by table id as strings to avoid type-mismatch between query/string and numeric ids
export const tableOrders = ref(loadOrders())
export const selectedTable = ref(null)



watch(tables, (newVal) => {
  localStorage.setItem(TABLES_KEY, JSON.stringify(newVal))
}, { deep: true })

watch(tableOrders, (newVal) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(newVal))
}, { deep: true })



export function selectTable(id) {
  selectedTable.value = Number(id)
}

export function occupyTable(id) {
  const nid = Number(id)
  const t = tables.value.find(x => x.id === nid)
  if (t) {
    t.status = 'occupied'
    if (!t.occupiedAt) {
      t.occupiedAt = new Date().toISOString()
    }
  }
}

export function freeTable(id) {
  const nid = Number(id)
  const t = tables.value.find(x => x.id === nid)
  if (t) {
    t.status = 'available'
    t.occupiedAt = null

    const key = String(nid)
    if (tableOrders.value[key]) {
      delete tableOrders.value[key]
    }
  }
}

export function addOrderToTable(id, items) {
  if (!id) return
  const key = String(id)

  if (!tableOrders.value[key]) {
    tableOrders.value[key] = []
  }

  items.forEach(i => {
    const itemId = i.id
    if (!itemId) {
      tableOrders.value[key].push({ ...i })
      return
    }

    const existing = tableOrders.value[key].find(x => x.id === itemId)
    if (existing) {
      existing.qty = (existing.qty || 1) + (i.qty || 1)
    } else {
      tableOrders.value[key].push({ ...i, qty: i.qty || 1 })
    }
  })
}

export function getOrdersForTable(id) {
  return tableOrders.value[String(id)] || []
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