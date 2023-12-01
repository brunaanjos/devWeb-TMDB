<script setup>
import BestMovies from '../components/Home/BestMovies.vue';
import SlidesMovies from '../components/Home/SlidesMovies.vue';
import SlidesTvs from '../components/Home/SlidesTvs.vue';
</script>

<template>
    <main>
        <BestMovies />

        <SlidesMovies />

        <SlidesTvs />
    </main>
</template>

<style scoped>
    main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 50px;
        padding-bottom: 20px;
    }
</style>