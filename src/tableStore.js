import { reactive, watch, toRef } from 'vue'

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
      console.error('Buyurtma xatoligi', e)
    }
  }
  return {}
}

// normalize orders object (ensure numeric prices and qty)
function normalizeOrders(raw) {
  if (!raw || typeof raw !== 'object') return {}
  const normalized = {}
  const normalizePrice = (p) => {
    if (p == null) return 0
    if (typeof p === 'number') return p
    const cleaned = String(p).replace(/[^0-9.-]+/g, '')
    const n = Number(cleaned)
    return Number.isFinite(n) ? n : 0
  }
  Object.keys(raw).forEach(k => {
    const arr = Array.isArray(raw[k]) ? raw[k] : []
    normalized[k] = arr.map(it => ({
      ...it,
      price: normalizePrice(it.price ?? it.originalPrice),
      originalPrice: normalizePrice(it.originalPrice ?? it.price),
      qty: Number(it.qty) || 1
    }))
  })
  return normalized
}

// Listen for localStorage changes (cross-tab) and merge into reactive state
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('storage', (e) => {
    try {
      if (!e.key) return
      if (e.key === TABLES_KEY) {
        const parsed = JSON.parse(e.newValue || 'null')
        if (Array.isArray(parsed)) {
          // replace array content reactively
          state.tables.splice(0, state.tables.length, ...parsed)
        }
      }
      if (e.key === ORDERS_KEY) {
        const parsed = JSON.parse(e.newValue || '{}')
        const normalized = normalizeOrders(parsed)
        // replace object keys reactively
        Object.keys(state.orders).forEach(k => delete state.orders[k])
        Object.keys(normalized).forEach(k => { state.orders[k] = normalized[k] })
      }
    } catch (err) {
      console.error('storage event handling error', err)
    }
  })
}

export const state = reactive({
  tables: loadTables(),
  orders: loadOrders(),
  selectedTableId: null
})

export const tables = toRef(state, 'tables')
export const tableOrders = toRef(state, 'orders')
export const selectedTable = toRef(state, 'selectedTableId')


watch(
  () => state.tables,
  (val) => localStorage.setItem(TABLES_KEY, JSON.stringify(val)),
  { deep: true }
)

watch(
  () => state.orders,
  (val) => localStorage.setItem(ORDERS_KEY, JSON.stringify(val)),
  { deep: true }
)


export function selectTable(id) {
  state.selectedTableId = Number(id)
}

export function occupyTable(id) {
  const nid = Number(id)
  const t = state.tables.find(x => x.id === nid)
  if (t) {
    t.status = 'occupied'
    if (!t.occupiedAt) {
      t.occupiedAt = new Date().toISOString()
    }
  }
}

export function freeTable(id) {
  const nid = Number(id)
  const t = state.tables.find(x => x.id === nid)
  if (t) {
    t.status = 'available'
    t.occupiedAt = null

    const key = String(nid)
    if (state.orders[key]) {
      delete state.orders[key]
    }
  }
}

export function addOrderToTable(id, items) {
  if (!id) return
  const key = String(id)

  if (!state.orders[key]) {
    state.orders[key] = []
  }

  items.forEach(i => {
    const itemId = i.id
    if (!itemId) {
      state.orders[key].push({ ...i })
      return
    }

    const existing = state.orders[key].find(x => x.id === itemId)
    
    if (existing) {
      existing.qty = (existing.qty || 1) + (i.qty || 1)
    } else {
      state.orders[key].push({ ...i, qty: i.qty || 1 })
    }
  })
}

export function getOrdersForTable(id) {
  return state.orders[String(id)] || []
}

export default {
  state,
  selectTable,
  occupyTable,
  freeTable,
  addOrderToTable,
  getOrdersForTable
}