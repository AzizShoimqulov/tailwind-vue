import { reactive, computed } from 'vue'
import { occupyTable, selectedTable, addOrderToTable } from './tableStore'

export const cartItems = reactive([])
export const cartCount = computed(() => cartItems.reduce((s, it) => s + (Number(it.qty) || 1), 0))

export function addToCart(item, qty = 1) {
  if (!item || !item.id) return
  const idx = cartItems.findIndex(i => i.id === item.id)
  if (idx !== -1) {
    cartItems[idx].qty = (Number(cartItems[idx].qty) || 1) + qty
  } else {
    cartItems.push({
      id: item.id,
      name: item.name,
      image: item.image,
      originalPrice: Number(item.originalPrice ?? item.price) || 0,
      price: Number(item.price ?? item.originalPrice) || 0,
      qty: qty,
      description: item.description || ''
    })
  }
}

export function removeFromCart(index) {
  if (index >= 0 && index < cartItems.length) {
    cartItems.splice(index, 1)
  }
}

export function clearCart() {
  cartItems.splice(0)
}

export async function placeOrder() {
  const tableId = selectedTable.value
  if (!tableId) return false
  if (cartItems.length > 0) {
    const ordersSaved = await Promise.resolve(addOrderToTable(tableId, cartItems.slice()))
    if (!ordersSaved) return false
  }
  const tableSaved = await Promise.resolve(occupyTable(tableId))
  if (!tableSaved) return false
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
