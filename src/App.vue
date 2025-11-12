<script setup>
import { ref } from "vue";

const message = ref("Salom Vue!");
</script>

<template>
  <h1 class="text-center text-5xl">{{ message }}</h1>
</template>
