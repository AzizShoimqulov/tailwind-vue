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
import Menemen from '../menu_img/image.png'
import Omlet from '../menu_img/image copy.png'
const menuItems = [
    {
        id: 1,
        name: 'Menemen',
        select: 'Nonushta',
        price: '39.000 so`m',
        image: Menemen,
    },
    {
        id: 2,
        name: 'Pishloqli Omlet',
        select: 'Nonushta',
        price: '39.000 so`m',
        image: Omlet,
    },
    {
        id: 3,
        name: 'Qovurmali Yumurta',
        select: 'Nonushta',
        price: '51.000 so`m',
        image: Qovurmali,
    },
    {
        id: 4,
        name: 'Sujukli Yumurta',
        select: 'Nonushta',
        price: '51.000 so`m',
        image: Sujukli,
    },
    {
        id: 5,
        name: 'Qovurilgan tuxum',
        select: 'Nonushta',
        price: '18.000 so`m',
        image: Qovurilgan,
    },
    {
        id: 6,
        name: 'Sigar Byurek',
        select: 'Nonushta',
        price: '32.000 so`m',
        image: SigarByurek,
    },
    {
        id: 7,
        name: 'Beyugludan Nonushta Set 1',
        select: 'Nonushta',
        price: '98.000 so`m',
        image: Set1,
    },
    {
        id: 8,
        name: 'Beyugludan Nonushta Set 2',
        select: 'Nonushta',
        price: '198.000 so`m',
        image: Set2,
    },

];
</script>