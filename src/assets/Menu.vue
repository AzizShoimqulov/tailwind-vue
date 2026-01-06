<template>
    <div>
        <div v-for="item in menuItems" :key="item.id" class="mb-6">
            <img :src="item.image" :alt="item.name" class="w-full h-64 object-cover rounded-lg" />
            <div class="mt-2">
                <h3 class="text-lg font-semibold">{{ item.name }}</h3>
                <p class="text-sm text-gray-600">{{ item.select }} • {{ item.price }}</p>
            </div>
        </div>
    </div>
</template>


<script setup>
import menuImg from '../img/image copy.png'

const menuItems = [
    {
        id: 1,
        name: 'Menemen',
        select: 'Nonushta',
        price: '39.000 so`m',
        image: menuImg,
    },
];
</script>