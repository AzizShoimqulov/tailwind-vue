<template>
    <section id="categories" class="py-16 scroll-mt-20 bg-white">
        <div class="container mx-auto px-4">
            <!--Section Header-->
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-amber-950 mb-3">Explore Our Fragrance Collections</h2>
                <p class="text-lg text-gray-800 max-w-2xl mx-auto">
                    Discover scents that match your personality
                </p>
            </div>
        </div>

        <!--Categories Grid-->
         <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(category) in categories" :key="index"></div>
         </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'; 

const categories =ref([
    {
        id: 8, 
        name: 'FRENCH ESSENCE CHARM',
        price: 29.99, 
        image: 'https://www.frenchessence.com/cdn/shop/files/30ML-CHARM-2.jpg?v=1758783530',
        rating: 4.5,
        discount: 10
    },
    {
        id: 9, 
        name: 'TOBACCO HONEY', 
        price: 39.99, 
        image: 'https://www.guerlain.com/on/demandware.static/-/Sites-GSA_US_Catalog/default/dw98164960/HeroBanner_NewTemplate/Fragrance/BEST_SELLERS/AM_HEADER-BANNER_PLP_DESKTOP_TOBACCO.jpg',
        rating: 4.0,
        discount: 15
    },
    {
        id: 10,
        name: 'Victorias Secret',
        price: 19.99, 
        image: 'https://cdn.platform.next/common/items/default/default/itemimages/3_4Ratio/product/lge/R81396s.jpg',
        rating: 4.2,
        discount: 50
    },
    {
        id: 11,
        name: 'ABSOLUS ALLEGRIA',
        price: 49.99, 
        image: 'https://res.cloudinary.com/dkbnpozos/image/upload/v1760360184/faces/Site/2025/brands_packages_visibility/october/GUERLAIN_SILVER/Desktop_750x500.jpg',
        rating: 4.8,
        discount: 20
    },
    {
        id: 12,
        name: 'COOL WATER',
        price: 59.99,
        image: 'https://alhaseeb.pk/cdn/shop/files/cool_water_perfume_by_alhaseeb.png?v=1753014298',
        rating: 3.9,
        discount: 1
    },
    {
        id: 13, 
        name: 'GODFATHER EDP', 
        price: 24.99, 
        image: 'https://beardo.in/cdn/shop/files/Beardo_Godfather_EDP_A__Banner_2160_x_2160_04.jpg?v=1758612605&width=1946',
        rating: 4.3,
        discount: 5
    },
])
</script>