<template>
    <div class="grid grid-cols-1 md:grid-cols-3 mx-28 gap-6">
        <div v-for="item in menuItems" :key="item.id" class="bg-white w-[500px] rounded-lg shadow-sm overflow-hidden">
            <img :src="item.image" :alt="item.name" class="w-full h-56 md:h-64 object-cover" />
            <div class="p-4">
                <h3 class="text-lg font-semibold">{{ item.name }}</h3>
                <p class="text-sm text-gray-600">{{ item.select }}</p>
                <p class="mt-2 text-pink-600 font-bold">{{ item.price }}</p>
            </div>
        </div>
    </div>
</template>


<script setup>
import Menemen from '../menu_img/image.png'
import Omlet from '../menu_img/image copy.png'
import Qovurmali from '../menu_img/image copy 2.png'
import Sujukli from '../menu_img/image copy 3.png'
import Qovurilgan from '../menu_img/image copy 4.png'
import SigarByurek from '../menu_img/image copy 5.png'
import Set1 from '../menu_img/image copy 6.png'
import Set2 from '../menu_img/image copy 7.png'
import Bonfile from '../menu_img/image copy 8.png'
import Fransuzskiy from '../menu_img/image copy 9.png'
import BEYUGLU from '../menu_img/image copy 10.png'     
import Grecheskiy from '../menu_img/image copy 11.png'
import MujskoyKapriz from '../menu_img/image copy 12.png'
import SMAK from '../menu_img/image copy 13.png'
import Sezar from '../menu_img/image copy 14.png'
import AnanasliSalat from '../menu_img/image copy 15.png'
import ChobanSalat from '../menu_img/image copy 16.png'
import TulumSalat from '../menu_img/image copy 17.png'
import QarsildoqBaqlajon from '../menu_img/image copy 18.png'
import ApilsinVaNokliSalat from '../menu_img/image copy 19.png'
import ShefSalat from '../menu_img/imge copy 20.png'
import GoshtliDolma from '../menu_img/image copy 21.png'
import Jajik from '../menu_img/image copy 22.png'
import Haydari from '../menu_img/image copy 23.png'
import AchikChuchuk from '../menu_img/image copy 24.png'
import ChiKofte from '../menu_img/image copy 25.png'
import EzmeSalat from '../menu_img/image copy 26.png'
import Yaponskiy from '../menu_img/image copy 27.png'
import OLIVYE from '../menu_img/image copy 28.png'
import MevsimSalat from '../menu_img/image copy 29.png'
import SalatRoko from '../menu_img/image copy 30.png'  
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
    //Salat
    {
        id: 9,
        name: 'Bonfile Salat',
        select: 'Salat',
        price: '67.000 so`m',
        image: Bonfile,
    },
    {
        id: 10,
        name: 'Fransuzskiy',
        select: 'Salat',
        price: '42.000 so`m',
        image: Fransuzskiy,
    },
    {
        id: 11,
        name: 'BEYUGLU Salat',
        select: 'Salat',
        price: '58.000 so`m',
        image: BEYUGLU,
    },
    {
        id: 12,
        name: 'Grecheskiy',
        select: 'Salat',
        price: '49.000 so`m',
        image: Grecheskiy,
    },
    {
        id: 13,
        name: 'Mujskoy Kapriz',
        select: 'Salat',
        price: '60.000 so`m',
        image: MujskoyKapriz,
    },
    {
        id: 14,
        name: 'SMAK',
        select: 'Salat',
        price: '45.000 so`m',
        image: SMAK,
    },
    {
        id: 15,
        name: 'Sezar',
        select: 'Salat',
        price: '53.000 so`m',
        image: Sezar,
    },
    {
        id: 16,
        name: 'Ananasli Salat',
        select: 'Salat',
        price: '58.000 so`m',
        image: AnanasliSalat,
    },
    {
        id: 17,
        name: 'Choban Salat',
        select: 'Salat',
        price: '44.000 so`m',
        image: ChobanSalat,
    },
    {
        id: 18,
        name: 'Tulum Salat',
        select: 'Salat',
        price: '55.000 so`m',
        image: TulumSalat,
    },
    {
       id: 19,
        name: 'Qarsildoq Baqlajon',
        select: 'Salat',
        price: '53.000 so`m',
        image: QarsildoqBaqlajon, 
    },
    {
        id: 20,
        name: 'Apilsin va nokli salat',
        select: 'Salat',
        price: '56.000 so`m',
        image: ApilsinVaNokliSalat,
    },
    {
        id: 21,
        name: 'Shef Salat',
        select: 'Salat',
        price: '69.000 so`m',
        image: ShefSalat,
    },
    {
        id: 22,
        name: 'Go`shtli Do`lma',
        select: 'Salat',
        price: '45.000 so`m',
        image: GoshtliDolma,
    },
    {
        id: 23,
        name: 'Jajik',
        select: 'Salat',
        price: '32.000 so`m',
        image: Jajik,
    },
    {
        id: 24,
        name: 'Haydari',
        select: 'Salat',
        price: '34.000 so`m',
        image: Haydari,
    },
    {
        id: 25,
        name: 'Achik Chuchuk',
        select: 'Salat',
        price: '34.000 so`m',
        image: AchikChuchuk,
    },
    {
        id: 26,
        name: 'Chi Kofte',
        select: 'Salat',
        price: '45.000 so`m',
        image: ChiKofte,
    },
    {
       id: 27,
        name: 'Ezme Salat',
        select: 'Salat',
        price: '44.000 so`m',
        image: EzmeSalat,
    },
    {
        id: 28,
        name: 'Yaponskiy',
        select: 'Salat',
        price: '44.000 so`m',
        image: Yaponskiy,
    },
    {
        id: 29,
        name: 'OLIVYE',
        select: 'Salat',
        price: '45.000 so`m',
        image: OLIVYE,
    },
    {
        id: 30,
        name: 'Mevsim Salat',
        select: 'Salat',
        price: '46.000 so`m',
        image: MevsimSalat,
    },
    {
        id: 31,
        name: 'Salat Roko',
        select: 'Salat',
        price: '48.000 so`m',
        image: SalatRoko,
    }

];
</script>