<script setup>
import { ref } from "vue";

const message = ref("Salom Vue!");
const counter = ref(0);
</script>

<template>
  <h1>{{ message }}</h1>
  <button @click="counter.value++">Click: {{ counter }}</button>
</template>
