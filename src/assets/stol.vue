<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tables = ref(
  Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `${index + 1}-Stol`,
    status: 'available'
  }))
);

const handleTableClick = (tableId) => {

  router.push({ path: '/menu', query: { table_id: tableId } });
};

const getStatusColor = (status) => {
  return status === 'available' 
    ? 'bg-white border-gray-200 text-gray-800 hover:border-[#F4EDDD] hover:bg-blue-50'
    : 'bg-red-100 border-red-500 text-red-800';
};
</script>

<template>
  <div class="min-h-screen mt-20 bg-gray-50 p-8">
    <header class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-800">Restoran Zali</h1>
      <p class="text-gray-500 mt-2">Buyurtma berish uchun stolni tanlang</p>
    </header>

    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
      
      <div 
        v-for="table in tables" 
        :key="table.id"
        @click="handleTableClick(table.id)"
        :class="[
          'relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-1 flex flex-col items-center justify-center text-center h-40',
          getStatusColor(table.status)
        ]"
      >
        <div class="mb-3 p-3 bg-[#F4EDDD] rounded-full text-[#E93325]">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>

        <h2 class="text-2xl font-bold">№{{ table.id }}</h2>
        <p class="text-sm text-gray-500 font-medium">Stol</p>
        <div class="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-blue-400 pointer-events-none"></div>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>