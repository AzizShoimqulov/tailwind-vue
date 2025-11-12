<script setup>
import { ref } from "vue";

const message = ref("Salom Vue!");
const counter = ref(0);

  function pls(){
    counter.value++
  }
  function mns(){
    message.value = "Matn uzgardi"
  }
</script>


<template>
  <h1>{{ message }}</h1>
  <p>Click: {{ counter }}</p>
  <div class="flex gap-4 mb-4">
    <button class="bg-slate-600" @click="pls">Bos</button>
    <button class="bg-slate-600" @click="mns">Matn uzgaradi</button>
  </div>
</template>
