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
  <h1>{{ message }}</h1>
  <p>Click: {{ counter }}</p>
  <div class="flex gap-4 mb-4">
    <button class="bg-slate-600" @click="pls">Bos</button>
    <button class="bg-slate-600" @click="mns">Matn uzgaradi</button>
  </div>
  <img v-bind:src="image" alt="dfs">
  <input v-model="ism" placeholder="ismingizni kiriting" type="text">
</template> -->


<template>
  <div class="container">
    <h1>Vue shart va ro‘yxat mashqi 🍀</h1>

    <input v-model="ism" placeholder="Ismingizni yozing" />

    <p v-if="ism.length > 0">Salom, {{ ism }}!</p>
    <p v-else>Ismingizni kiriting 👇</p>

    <hr />

    <h3>Mevalar ro‘yxati:</h3>
    <ul>
      <li v-for="(meva, i) in mevalar" :key="i">{{ i + 1 }}. {{ meva }}</li>
    </ul>

    <button @click="mevalar.push('Yangi meva')">➕ Qo‘shish</button>
    <button @click="mevalar.pop()">➖ O‘chirish</button>

    <p v-show="mevalar.length === 0">Hech qanday meva yo‘q 😢</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const ism = ref("");
const mevalar = ref(["Olma", "Anor", "Apelsin"]);
</script>

<style scoped>
.container {
  text-align: center;
  font-family: sans-serif;
  margin-top: 40px;
}
input {
  padding: 8px;
  margin: 10px 0;
}
button {
  margin: 5px;
  padding: 6px 15px;
  border: none;
  background: #42b883;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background: #2c8e6f;
}
</style>
