<script setup>
import TvGenresSlide from '@/components/Tv/TvGenresSlide.vue';
import Tv from '../components/Tv/Tv.vue';
import Loading from 'vue-loading-overlay';
import { ref, computed } from 'vue';
import { useTvStore } from '@/stores/tv';

const tvStore = useTvStore();

const tvOfGenre = ref(tvStore.popularTv);
const isLoading = ref(false);

async function getTvOfGenre(genreId) {
    if (genreId == -1) {
        tvOfGenre.value = tvStore.popularTv;
        return;
    }
    isLoading.value = true; 
    tvOfGenre.value = await tvStore.getTvOfGenre(genreId);
    isLoading.value = false; 
}
</script>

<template>
    <main>
        <loading v-model:active="isLoading" is-full-page :background-color="'#D90452'" :opacity="'1'"/>  
        <TvGenresSlide @getTvOfGenre="getTvOfGenre"/>

        <section class="tv">
            <Tv v-for="(tv, index) in tvOfGenre" :key="index" :tv="tv"/>
        </section>
    </main>
</template>

<style scoped>

    main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
    .tv {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        padding: 10px 20px;
    }
</style>
