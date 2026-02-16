<script setup>
import { ref } from 'vue';

const tables = ref(
  Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `${index + 1}-Stol`,
    seats: Math.floor(Math.random() * 4) + 2, 
    status: 'available'
  }))
);

const toggleStatus = (tableId) => {
  const table = tables.value.find(t => t.id === tableId);
  if (table) {
    table.status = table.status === 'available' ? 'occupied' : 'available';
  }
};

const getStatusColor = (status) => {
  return status === 'available' 
    ? 'bg-green-100 border-green-500 text-green-800' 
    : 'bg-red-100 border-red-500 text-red-800';
};
</script>

<template>
  <div class="min-h-screen mt-20 bg-gray-50 p-8">
    <header class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-800">Restoran Zali</h1>
      <p class="text-gray-500 mt-2">Stol band qiling</p>
      <div class="flex justify-center gap-4 mt-4 text-sm font-medium">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-green-500 rounded-full"></span> Bo'sh
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-red-500 rounded-full"></span> Band
        </div>
      </div>
    </header>

    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
      
      <div 
        v-for="table in tables" 
        :key="table.id"
        @click="toggleStatus(table.id)"
        :class="[
          'relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1',
          getStatusColor(table.status)
        ]"
      >
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-xl font-bold">№{{ table.id }}</h2>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="space-y-1">
          <p class="text-sm font-medium opacity-90">
            Joylar: {{ table.seats }} kishilik
          </p>
          <p class="text-xs uppercase font-bold tracking-wider mt-2">
            {{ table.status === 'available' ? "BO'SH" : "BAND" }}
          </p>
        </div>

        <div class="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-blue-400 pointer-events-none"></div>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>