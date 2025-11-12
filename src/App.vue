<script setup>
import { ref } from "vue";

const message = ref("Salom Vue!");
const counter = ref(0);

  function pls(){
    counter.value++
  }
</script>

<template>
  <h1>{{ message }}</h1>
  <button class="bg-slate-600" @click="counter.value++">Click: {{ counter }}</button>
</template>
