<template>
  <div class="min-h-screen">
    <Todolist />
    <Hero />
    <Categories />
    <Menu />
  </div>
</template>

<script setup>
import Todolist from './todolist.vue'
import Hero from './assets/Hero.vue'
import Categories from './assets/Categories.vue';
import Menu from './assets/Menu.vue';
</script>

