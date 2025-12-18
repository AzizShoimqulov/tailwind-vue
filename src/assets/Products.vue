<template>
<section class="py-12 scroll-mt-20 bg-gray-50" id="products">
    <main class="container mx-auto px-4">
        <header class="flex justify-between items-center mb-8">
            <h2 class="md:text-3xl text-2xl font-bold text-amber-900">Feartured Products</h2>
            <nav class="flex space-x-4" aria-label="Product carousels">
                <button 
                class="p-2 rounded-full bg-white shadow-md hover:bg-pink-100
                text-pink-600 transition-colors" aria-label="Previous slide">
                    <Icon icon="line-md:arrow-small-left" width="24" height="24"/>
                </button>
                <button 
                class="p-2 rounded-full bg-white shadow-md hover:bg-pink-100
                text-pink-600 transition-colors" aria-label="Next slide">
                    <Icon icon="line-md:arrow-small-right" width="24" height="24"/>
                </button>
            </nav>
        </header>

        <section class="relative overflow-hidden">
            <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></ul>
        </section>

    </main>
</section>
</template>


<script setup>
import { Icon } from '@iconify/vue';

</script>
