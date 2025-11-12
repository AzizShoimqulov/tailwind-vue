<script setup>
import { ref } from "vue";

const counter = ref(0);

function increment() {
  counter.value++;
}
</script>

<template>
  <p>Click: {{ counter }}</p>
  <button @click="increment">Bos</button>
</template>
