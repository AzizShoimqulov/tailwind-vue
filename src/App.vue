<template>
  <div class="min-h-screen">
    <Todolist />
    <router-view />
  </div>
</template>

<script setup>
import Todolist from './todolist.vue'
// Page components are provided by the router (Home, Menyu)
</script>

