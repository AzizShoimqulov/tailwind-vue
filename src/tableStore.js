import { reactive, watch, toRef } from 'vue'
import { db, isFirebaseConfigured } from './firebase'
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'

const TABLES_KEY = 'restaurant_tables_data'
const ORDERS_KEY = 'restaurant_orders_data'

const createDefaultTable = (id) => ({
  id,
  name: `${id}-Stol`,
  status: 'available',
  occupiedAt: null,
  updatedAt: null
})

const normalizeTables = (raw) => {
  const source = Array.isArray(raw) ? raw : []
  const byId = new Map()

  source.forEach((t) => {
    const id = Number(t?.id)
    if (Number.isFinite(id) && id >= 1 && id <= 20) {
      byId.set(id, {
        ...createDefaultTable(id),
        ...t,
        id
      })
    }
  })

  return Array.from({ length: 20 }, (_, i) => byId.get(i + 1) || createDefaultTable(i + 1))
}


const loadTables = () => {
  const stored = localStorage.getItem(TABLES_KEY)
  if (stored) {
    try {
      return normalizeTables(JSON.parse(stored))
    } catch (e) {
      console.error('Stol ma\'lumotlarini o\'qishda xatolik', e)
    }
  }
  return normalizeTables([])
}

const loadOrders = () => {
  const stored = localStorage.getItem(ORDERS_KEY)
  if (stored) {
    try {
      return normalizeOrders(JSON.parse(stored))
    } catch (e) {
      console.error('Buyurtma xatoligi', e)
    }
  }
  return {}
}

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

if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('storage', (e) => {
    try {
      if (!e.key) return
      if (e.key === TABLES_KEY) {
        const parsed = JSON.parse(e.newValue || 'null')
        if (Array.isArray(parsed)) {
          state.tables.splice(0, state.tables.length, ...normalizeTables(parsed))
        }
      }
      if (e.key === ORDERS_KEY) {
        const parsed = JSON.parse(e.newValue || '{}')
        const normalized = normalizeOrders(parsed)
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

// If Firebase is configured, setup realtime listeners to keep state in sync
if (isFirebaseConfigured) {
  try {
    const tablesCol = collection(db, 'tables')
    const ordersCol = collection(db, 'orders')

    onSnapshot(tablesCol, (snap) => {
      const byId = new Map()
      snap.docs.forEach((d) => {
        const raw = d.data()
        if (!raw) return
        const id = Number(raw.id ?? d.id)
        if (!Number.isFinite(id) || id < 1 || id > 20) return
        byId.set(id, {
          ...createDefaultTable(id),
          ...raw,
          id
        })
      })

      if (byId.size === 0) return

      const merged = state.tables.map((table) => {
        const incoming = byId.get(table.id)
        if (!incoming) return table

        const localTs = Date.parse(table.updatedAt || '')
        const incomingTs = Date.parse(incoming.updatedAt || '')
        const hasLocalTs = Number.isFinite(localTs)
        const hasIncomingTs = Number.isFinite(incomingTs)

        // Ignore stale remote snapshots if local state is newer.
        if (hasLocalTs && (!hasIncomingTs || incomingTs < localTs)) {
          return table
        }

        return { ...table, ...incoming, id: table.id }
      })

      state.tables.splice(0, state.tables.length, ...merged)
    }, (err) => console.error('tables onSnapshot error', err))

    onSnapshot(ordersCol, (snap) => {
      const parsed = {}
      snap.docs.forEach(d => { parsed[d.id] = d.data().items || [] })
      const normalized = normalizeOrders(parsed)
      // replace object keys reactively
      Object.keys(state.orders).forEach(k => delete state.orders[k])
      Object.keys(normalized).forEach(k => { state.orders[k] = normalized[k] })
    }, (err) => console.error('orders onSnapshot error', err))
  } catch (err) {
    console.error('Firebase realtime setup error', err)
  }
}


export function selectTable(id) {
  state.selectedTableId = Number(id)
}

export function occupyTable(id) {
  const nid = Number(id)
  const t = state.tables.find(x => x.id === nid)
  if (t) {
    const now = new Date().toISOString()
    t.status = 'occupied'
    if (!t.occupiedAt) {
      t.occupiedAt = now
    }
    t.updatedAt = now
    // persist to Firestore if configured
    if (isFirebaseConfigured) {
      try { setDoc(doc(db, 'tables', String(nid)), { ...t }).catch(console.error) } catch(e) { console.error(e) }
    }
  }
}

export function freeTable(id) {
  const nid = Number(id)
  const t = state.tables.find(x => x.id === nid)
  if (t) {
    const now = new Date().toISOString()
    t.status = 'available'
    t.occupiedAt = null
    t.updatedAt = now

    const key = String(nid)
    if (state.orders[key]) {
      delete state.orders[key]
    }
    if (isFirebaseConfigured) {
      try {
        setDoc(doc(db, 'tables', String(nid)), { ...t }).catch(console.error)
        deleteDoc(doc(db, 'orders', key)).catch(console.error)
      } catch(e) { console.error(e) }
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
  if (isFirebaseConfigured) {
    try {
      setDoc(doc(db, 'orders', key), { items: state.orders[key] }).catch(console.error)
    } catch(e) { console.error(e) }
  }
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
