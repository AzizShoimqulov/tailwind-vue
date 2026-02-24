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
import { db } from './firebase'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
</script>

