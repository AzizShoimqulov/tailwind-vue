import { ref, computed } from 'vue'
import { occupyTable, selectedTable, addOrderToTable } from './tableStore'

export const cartItems = ref([])
export const cartCount = computed(() => cartItems.value.reduce((s, it) => s + (it.qty || 1), 0))

export function addToCart(item, qty = 1) {
  if (!item || !item.id) return
  const idx = cartItems.value.findIndex(i => i.id === item.id)
  if (idx !== -1) {
    cartItems.value[idx].qty = (cartItems.value[idx].qty || 1) + qty
  } else {
    cartItems.value.push({
      id: item.id,
      name: item.name,
      image: item.image,
      originalPrice: item.originalPrice ?? item.price ?? 0,
      price: item.price ?? item.originalPrice ?? item.price,
      qty: qty,
      description: item.description || ''
    })
  }
}

export function removeFromCart(index) {
  if (index >= 0 && index < cartItems.value.length) {
    cartItems.value.splice(index, 1)
  }
}

export function clearCart() {
  cartItems.value.splice(0)
}

export function placeOrder() {
  const tableId = selectedTable.value
  if (!tableId) return false
  if (cartItems.value.length > 0) {
    addOrderToTable(tableId, cartItems.value.slice())
  }
  occupyTable(tableId)
  clearCart()
  return true
}

export default {
  cartItems,
  cartCount,
  addToCart,
  removeFromCart,
  clearCart,
  placeOrder
}
