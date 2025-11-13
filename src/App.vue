<!-- <script setup>
import { ref } from "vue";

const message = ref("Salom Vue!");
const counter = ref(0);
const image = ref("https://vuejs.org/images/logo.png");
const ism = ref("");

  function pls(){
    counter.value++
  }
  function mns(){
    message.value = "Matn uzgardi"
  }
</script>


<template>
  <div class="p-4 flex flex-col items-center">
    <h1>{{ message }}</h1>
    <p>Click: {{ counter }}</p>
    <div class="flex gap-4 mb-4">
      <button class="bg-slate-600" @click="pls">Bos</button>
      <button class="bg-slate-600" @click="mns">Matn uzgaradi</button>
    </div>
    <img v-bind:src="image" alt="dfs">
    <input v-model="ism" placeholder="ismingizni kiriting" type="text">
  </div>
</template> -->

<template>
  <div>
    <h2 v-if="isOnlayn">Siz onlaynsiz</h2>
    <h2 v-else>Siz oflaynsiz</h2>

    <button @click="isOnlayn = !isOnlayn">Holatni uzgartir</button>
  </div>
</template>


<script setup>
  import { ref } from 'vue';
  const isOnlayn = ref(true)
</script>