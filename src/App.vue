<script setup>
import { ref } from "vue";

const message = ref("Salom Vue!");
const counter = ref(0);

  function pls(){
    counter.value++
  }
</script>


<div class="">0</div>
<template>
  <h1>{{ message }}</h1>
  <p>Click: {{ counter }}</p>
  <button class="bg-slate-600" @click="pls">Bos</button>
</template>
