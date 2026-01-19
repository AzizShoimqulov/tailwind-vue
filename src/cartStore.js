import { ref, computed } from 'vue'

export const cartItems = ref([])

export const cartCount = computed(() => cartItems.value.length)

export function addToCart(item) {
  cartItems.value.push({ ...item })
}

export function removeFromCart(index) {
  if (index >= 0 && index < cartItems.value.length) {
    cartItems.value.splice(index, 1)
  }
}

export function clearCart() {
  cartItems.value.splice(0)
}

export default {
  cartItems,
  cartCount,
  addToCart,
}
