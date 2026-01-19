
<template>
  <div class="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Bizning Menyular</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
                <div 
                    v-for="item in filteredItems" 
          :key="item.id" 
          class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
        >
          <div class="relative h-64 overflow-hidden">
            <img 
              :src="item.image" 
              :alt="item.name" 
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
            />
            
            <span v-if="item.tag" class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
              {{ item.tag }}
            </span>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{{ item.name }}</h3>
            
            <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ item.description }}</p>

            <div class="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
              <div class="flex flex-col">
                <span class="text-xs text-gray-400 font-medium uppercase tracking-wider">Narx</span>
                <span class="text-2xl font-bold text-gray-900">{{ item.price }}</span>
              </div>
              
              <button 
                @click="addToCart(item)"
                class="flex items-center gap-2 bg-[#F4EDDD] text-[#E93325] px-6 py-3 rounded-xl font-semibold hover:bg-[#E93325] hover:text-white transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Qo'shish
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import { searchTerm } from '../searchStore'
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
import ShefSalat from '../menu_img/image copy 20.png'
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
import ChechevechniyShorva from '../menu_img/image copy 31.png'
import EzogelinShorva from '../menu_img/image copy 32.png'
import TilShorva from '../menu_img/image copy 33.png'
import QoziqorinliShorva from '../menu_img/image copy 34.png'
import IskanderKebab150g from '../menu_img/image copy 35.png'
import GoshtliDonar150g from '../menu_img/image copy 36.png'
import BeyogluYaproqBeti from '../menu_img/image copy 37.png'
import PilavUstuDoner from '../menu_img/image copy 38.png'
import Sarma from '../menu_img/image copy 39.png'
import BeyogluIskandar from '../menu_img/image copy 40.png'
import BeyogluDonar200g from '../menu_img/image copy 41.png'
import ValiKebab from '../menu_img/image copy 42.png'
import KuzuTandir from '../menu_img/image copy 43.png'  
import TovuqKebabKarashik from '../menu_img/image copy 44.png'
import TovuqShish from '../menu_img/image copy 45.png'
import TovuqChopShish from '../menu_img/image copy 46.png'
import GoshtliSachTava from '../menu_img/image copy 47.png'
import GoshtliSote from '../menu_img/image copy 48.png'
import TovuqliSote from '../menu_img/image copy 49.png'
import TovuqQanotlari from '../menu_img/image copy 50.png'
import TovuqliPerzola from '../menu_img/image copy 51.png'
import AlinazikKefirBilan from '../menu_img/image copy 52.png'
import ShashlikMolGoshti from '../menu_img/image copy 53.png'
import ShashlikAdana from '../menu_img/image copy 54.png'
import GoshtliShashlikAssorti from '../menu_img/image copy 55.png'
import ShashlikUrfa from '../menu_img/image copy 56.png'
import Antrikot from '../menu_img/image copy 57.png'
import BonfilePiyozBilanTerSaryogida from '../menu_img/image copy 58.png'
import KuyGoshtliPerzola from '../menu_img/image copy 59.png'
import BonfileSteyk from '../menu_img/image copy 60.png'
import KasabKofta from '../menu_img/image copy 61.png'
import KasarliKofta from '../menu_img/image copy 62.png'
import GoshtliChopShish from '../menu_img/image copy 63.png'
import KebabJigar from '../menu_img/image copy 64.png' 
import PishloqliKotlet from '../menu_img/image copy 66.png'
import BolognesePasta from '../menu_img/image copy 67.png'
import QoziqorinliTil from '../menu_img/image copy 68.png'
import Medalion from '../menu_img/image copy 69.png'
import QoziqorinliGosht from '../menu_img/image copy 70.png'
import Koreyka from '../menu_img/image copy 71.png'
import XitoychaGosht from '../menu_img/image copy 72.png'
import Donar500g from '../menu_img/image copy 73.png'
import Donar1kg from '../menu_img/image copy 74.png'
import AssortiKebab2x from '../menu_img/image copy 75.png'
import AssortiKebab4x from '../menu_img/image copy 76.png'
import AssortiKebab6x from '../menu_img/image copy 77.png'
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
    },
    //Birinchi ovqat
    
    {
        id:32,
        name: 'Chechevechniy Sho`rva',
        select: 'Birinchi Ovqat',
        price: '26.000 so`m',
        image: ChechevechniyShorva,
    },
    {
        id:33,
        name: 'Ezogelin Sho`rva',
        select: 'Birinchi Ovqat',
        price: '30.000 so`m',
        image: EzogelinShorva,
    },
    {
        id:34,
        name: 'Til Sho`rva',
        select: 'Birinchi Ovqat',
        price: '36.000 so`m',
        image: TilShorva,
    },
    {
        id:35,
        name: 'Qo`ziqorinli Sho`rva',
        select: 'Birinchi Ovqat',
        price: '26.000 so`m',
        image: QoziqorinliShorva,
    },
    //ikkinchi ovqat
    {
        id:36,
        name: 'Iskander Kebab 150g',
        select: 'Ikkinchi Ovqat',
        price: '89.000 so`m',
        image: IskanderKebab150g,
    },
    {
        id:37,
        name: 'Go`shtli Donar 150g',
        select: 'Ikkinchi Ovqat',
        price: '99.000 so`m',
        image: GoshtliDonar150g,
    },
    {
        id:38,
        name: 'Beyoglu Yaproq Beti',
        select: 'Ikkinchi Ovqat',
        price: '89.000 so`m',
        image: BeyogluYaproqBeti,
    },
    {
        id:39,
        name: 'Pilav Ustu Doner',
        select: 'Ikkinchi Ovqat',
        price: '89.000 so`m',
        image: PilavUstuDoner,
    },
    {
        id:40,
        name: 'Sarma',
        select: 'Ikkinchi Ovqat',
        price: '95.000 so`m',
        image: Sarma,
    },
    {
        id:41,
        name: 'Beyoglu Iskandar 200g',
        select: 'Ikkinchi Ovqat',
        price: '165.000 so`m',
        image: BeyogluIskandar,
    },
    {
        id:42,
        name: 'Beyoglu Donar 200g',
        select: 'Ikkinchi Ovqat',
        price: '165.000 so`m',
        image: BeyogluDonar200g,
    },
    {
        id:43,
        name: 'Vali Kebab',
        select: 'Ikkinchi Ovqat',
        price: '139.000 so`m',
        image: ValiKebab,
    },
    {
        id:44,
        name: 'Tovuqli Sach Tava',
        select: 'Ikkinchi Ovqat',
        price: '75.000 so`m',
        image: KuzuTandir,
    },
    {
        id:45,
        name: 'Tovuq Kebab Karashik',
        select: 'Ikkinchi Ovqat',
        price: '75.000 so`m',
        image: TovuqKebabKarashik,
    },
    {
        id:46,
        name: 'Tovuq Shish',
        select: 'Ikkinchi Ovqat',
        price: '65.000 so`m',
        image: TovuqShish,
    },
    {
        id:47,
        name: 'Tovuq Chop Shish',
        select: 'Ikkinchi Ovqat',
        price: '65.000 so`m',
        image: TovuqChopShish,
    },
    {
        id:48,
        name: 'Go`shtli Sach Tava',
        select: 'Ikkinchi Ovqat',
        price: '97.000 so`m',
        image: GoshtliSachTava,
    },
    {
        id:49,
        name: 'Go`shtli Sote',
        select: 'Ikkinchi Ovqat',
        price: '93.000 so`m',
        image: GoshtliSote,
    },
    {
        id:50,
        name: 'Tovuqli Sote',
        select: 'Ikkinchi Ovqat',
        price: '91.000 so`m',
        image: TovuqliSote,
    },
    {
        id:51,
        name: 'Tovuq Qanotlari',
        select: 'Ikkinchi Ovqat',
        price: '77.000 so`m',
        image: TovuqQanotlari,
    },
    {
        id:52,
        name: 'Tovuqli Perzola',
        select: 'Ikkinchi Ovqat',
        price: '77.000 so`m',
        image: TovuqliPerzola,
    },
    {
        id:53,
        name: 'Alinazik Kefir Bilan',
        select: 'Ikkinchi Ovqat',
        price: '91.000 so`m',
        image: AlinazikKefirBilan,
    },
    {
        id:54,
        name: 'Shashlik Mol go`shti',
        select: 'Ikkinchi Ovqat',
        price: '99.000 so`m',
        image: ShashlikMolGoshti,
    },
    {
        id:55,
        name: 'Shashlik Adana',
        select: 'Ikkinchi Ovqat',
        price: '89.000 so`m',
        image: ShashlikAdana,
    },
    {
        id:56,
        name: 'Go`shtli Shashlik Assorti',
        select: 'Ikkinchi Ovqat',
        price: '138.000 so`m',
        image: GoshtliShashlikAssorti,
    },
    {
        id:57,
        name: 'Shashlik Urfa',
        select: 'Ikkinchi Ovqat',
        price: '87.000 so`m',
        image: ShashlikUrfa,
    },
    {
        id:58,
        name: 'Antrikot',
        select: 'Ikkinchi Ovqat',
        price: '149.000 so`m',
        image: Antrikot,
    },
    {
        id:59,
        name: 'Bonfile piyoz bilan ter saryog`ida',
        select: 'Ikkinchi Ovqat',
        price: '139.000 so`m',
        image: BonfilePiyozBilanTerSaryogida,
    },
    {
        id:60,
        name: 'Qo`y Go`shtli Perzola',
        select: 'Ikkinchi Ovqat',
        price: '140.000 so`m',
        image: KuyGoshtliPerzola,
    },
    {
        id:61,
        name: 'Bonfile Steyk',
        select: 'Ikkinchi Ovqat',
        price: '147.000 so`m',
        image: BonfileSteyk,
    },
    {
        id:62,
        name: 'Kasab Kofta',
        select: 'Ikkinchi Ovqat',
        price: '89.000 so`m',
        image: KasabKofta,
    },
    {
        id:63,
        name: 'Kasarli Kofta',
        select: 'Ikkinchi Ovqat',
        price: '89.000 so`m',
        image: KasarliKofta,
    },
    {
        id:64,
        name: 'Go`shtli Cho`p Shish',
        select: 'Ikkinchi Ovqat',
        price: '102.000 so`m',
        image: GoshtliChopShish,
    },
    {
        id:65,
        name: 'Kebab Jigar',
        select: 'Ikkinchi Ovqat',
        price: '55.000 so`m',
        image: KebabJigar,
    },
    //Yangilik Ikkinchi ovqat
    {
        id:66,
        name: 'Pishloqli Kotlet',
        select: 'Yangilik Ikkinchi Ovqat',
        price: '63.000 so`m',
        image: PishloqliKotlet,
    },
    {
        id:67,
        name: 'Bolognese Pasta',
        select: 'Yangilik Ikkinchi Ovqat',
        price: '55.000 so`m',
        image: BolognesePasta,
    },
    {
        id:68,
        name: 'Qo`ziqorinli til',
        select: 'Yangilik Ikkinchi Ovqat',
        price: '63.000 so`m',
        image: QoziqorinliTil,
    },
    {
        id:69,
        name: 'Medalion',
        select: 'Yangilik Ikkinchi Ovqat',
        price: '145.000 so`m',
        image: Medalion,
    },
    {
        id:70,
        name: 'Qo`ziqorinli go`sht',
        select: 'Yangilik Ikkinchi Ovqat',
        price: '93.000 so`m',
        image: QoziqorinliGosht,
    },
    {
        id:71,
        name: 'Koreyka',
        select: 'Yangilik Ikkinchi Ovqat',
        price: '153.000 so`m',
        image: Koreyka,
    },
    {
        id:72,
        name: 'Xitoycha go`sht',
        select: 'Yangilik Ikkinchi Ovqat',
        price: '93.000 so`m',
        image: XitoychaGosht,
    },
    // Donar
    {
        id:73,
        name: 'Donar 0.5kg',
        select: 'Donar',
        price: '250.000 so`m',
        image: Donar500g,
    },
    {
        id:74,
        name: 'Donar 1kg',
        select: 'Donar',
        price: '500.000 so`m',
        image: Donar1kg,
    },
    //Assorti Kebab
    {
        id:75,
        name: 'Assorti Kebab 2x',
        select: 'Assorti Kebab',
        price: '267.000 so`m',
        image: AssortiKebab2x,
    },
    {
        id:76,
        name: 'Assorti Kebab 4x',
        select: 'Assorti Kebab',
        price: '497.000 so`m',
        image: AssortiKebab4x,
    },
    {
        id:77,
        name: 'Assorti Kebab 6x',
        select: 'Assorti Kebab',
        price: '657.000 so`m',
        image: AssortiKebab6x,
    },
];

const filteredItems = computed(() => {
    const q = (searchTerm.value || '').toString().trim().toLowerCase()
    if (!q) return menuItems
    return menuItems.filter(item => (item.name || '').toLowerCase().includes(q))
})
</script>