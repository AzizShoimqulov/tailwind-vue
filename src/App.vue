<!-----
<script setup>
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
</template>  



<template>
  <ul>
    <li v-for="user in adultUsers" :key="user.id">
      {{ user.name }} ({{ user.age }})
    </li>
  </ul>
</template>

<script setup>
import { ref, computed } from 'vue'

const users = ref([ 
  { id: 1, name: "Ali", age: 15 },
  { id: 2, name: "Vali", age: 20 },
  { id: 3, name: "Malika", age: 18 }
])

const adultUsers = computed(() => {
  return users.value.filter(u => u.age >= 18)
})
</script>



<<<<<<<<<<< V-model >>>>>>>>>>
<script setup>
import { ref } from "vue";

const ism = ref("");
</script>

<template>
  <input v-model="ism" placeholder="Ismingni yoz..." />
  <h2>Salom, {{ ism }}</h2>
</template>




<!--  >>>>>>>>>>>>> v-if, v-else-if, v-else, v-show, v-for<<<<<<<<<<<<<<<<<<

<template>
  <div class="p-4 flex flex-col items-center gap-4">
    <div>
      <h2 v-if="isOnlayn">Siz onlaynsiz</h2>
      <h2 v-else>Siz oflaynsiz</h2>
      <button @click="isOnlayn = !isOnlayn">Holatni uzgartir</button>
    </div>
    <div>
      <p v-if="age>=18">Kattalar uchun</p>
      <p v-else-if="age>=13">Usmirlar uchun</p>
      <p v-else>Yosh bolalar uchun</p>
    </div>
    <div>
      <h2 v-show="isVs">|||</h2>
      <button @click="isVs = !isVs">Kurasat\Yashir</button>
    </div>

    <div>
      <ul>
        <li v-for="(meva, index) in mevalar" :key="index">
          {{ index + 1 }}. {{ meva }}
        </li>  
      </ul>
    </div>

    <div v-for= "user in users" :key="user.id">
      <p>{{ user.name }} - {{ user.age }} yosh</p>
    </div>

  </div>
</template>

sdaasd
<script setup>
  import { ref } from 'vue';
  const isOnlayn = ref(true)
  const age = ref(10)
  const isVs = ref(true)

  const mevalar = ref(['Olma', 'Banan', 'Anor', 'Nok', 'Behi'])

  const users=ref([
    { id: 1, name: 'Azizbek', age: 20 },
    { id: 2, name: 'Madina', age: 17 },
    { id: 3, name: 'Sardor', age: 25 },
    { id: 4, name: 'Laylo', age: 15 },
  ]);
</script>


<template>
  <div>
    <button @click="fetchMovie">Click</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios"; 

const posts = ref([]);

  async function fetchMovie(){
    try{
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
  posts.value = res.data;
  console.log(res.data);
}catch(error){
  console.log("Xatolik yuz berdi", error);
  }
}
</script>
-->


<template>
  <div>
    <input type="number" v-model="a">
    <input type="number" v-model="b">

    <p>{{ sum }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
 const a = ref(0);
 const b = ref(0);

 const sum = computed(()=> a.value + b.value);

</script>

