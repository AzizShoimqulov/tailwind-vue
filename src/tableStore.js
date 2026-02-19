import { ref } from 'vue'

export const tables = ref(
  Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `${index + 1}-Stol`,
    status: 'available',
    occupiedAt: null
  }))
)

export const selectedTable = ref(null)

export function selectTable(id) {
  selectedTable.value = id
}

export function occupyTable(id) {
  const t = tables.value.find(x => x.id === id)
  if (t) {
    t.status = 'occupied'
    t.occupiedAt = new Date().toISOString()
  }
}

export function freeTable(id) {
  const t = tables.value.find(x => x.id === id)
  if (t) {
    t.status = 'available'
    t.occupiedAt = null
  }
}
export const tableOrders = ref({})

export function addOrderToTable(id, items) {
  if (!id) return
  if (!tableOrders.value[id]) tableOrders.value[id] = []
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
  selectedTable,
  selectTable,
  occupyTable,
  freeTable
}
