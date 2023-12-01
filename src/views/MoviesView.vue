<script setup>
import MoviesGenresSlide from '@/components/Movies/MoviesGenresSlide.vue';
import Movies from '../components/Movies/Movies.vue';
import { ref, computed } from 'vue';
import { useMoviesStore } from '@/stores/movies';

const movieStore = useMoviesStore();

const moviesOfGenre = ref(movieStore.popularMovies);

async function getMoviesOfGenre(genreId) {
    if (genreId == -1) {
        moviesOfGenre.value = movieStore.popularMovies;
        return;
    }
    moviesOfGenre.value = await movieStore.getMoviesOfGenre(genreId);
}
</script>

<template>
    <main>
        <MoviesGenresSlide @getMoviesOfGenre="getMoviesOfGenre"/>

        <section class="movies">
            <Movies v-for="(movie, index) in moviesOfGenre" :key="index" :movie="movie"/>
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
    .movies {
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
