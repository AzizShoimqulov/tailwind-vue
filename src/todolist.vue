<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-xl shadow p-6">
      
      <h1 class="text-2xl font-bold text-center mb-4">
        Todo List
      </h1>

      <!-- Todo qo‘shish -->
      <div class="flex gap-2 mb-4">
        <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          type="text"
          placeholder="Yangi vazifa..."
          class="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          @click="addTodo"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <!-- Todo ro‘yxat -->
      <ul class="space-y-2">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
        >
          <div
            @click="toggleTodo(todo.id)"
            class="flex-1 cursor-pointer"
            :class="{ 'line-through text-gray-400': todo.done }"
          >
            {{ todo.text }}
          </div>

          <button
            @click="removeTodo(todo.id)"
            class="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </li>
      </ul>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const newTodo = ref('')
const todos = ref([])

function addTodo() {
  if (!newTodo.value.trim()) return

  todos.value.push({
    id: Date.now(),
    text: newTodo.value,
    done: false
  })

  newTodo.value = ''
}

function toggleTodo(todo) {
  todo.done = !todo.done
}

function removeTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}

watch(
  todos,
  (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
  },
  { deep: true }
)

onMounted(() => {
  const saved = localStorage.getItem('todos')
  if (saved) {
    todos.value = JSON.parse(saved)
  }
})
</script>

