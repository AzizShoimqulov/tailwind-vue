<template>
  <div class="min-h-screen">
    <Todolist />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Footer from './assets/footer.vue'
import Todolist from './todolist.vue'
</script>

