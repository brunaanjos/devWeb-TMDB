<script setup>
import { ref, computed } from 'vue';
import { useMoviesStore } from '@/stores/movies';
import { useTvStore } from '@/stores/tv';

const movieStore = useMoviesStore();
const tvStore = useTvStore();

const genreMovies = computed(() => movieStore.genreMovies);

const genreActive = ref(-1);
 
function changeGenreActive(index) {
    genreActive.value = index;
    console.log(genreActive.value)
}
</script>

<template>
    <section>
        <div class="genres">
            <div class="genre" @click="changeGenreActive(-1), $emit('getMoviesOfGenre', -1)" :class="genreActive == -1 ? 'active' : ''">
                <h2>Populares</h2>
            </div>
            <div class="genre" v-for="(genre, index) in genreMovies" :key="index" :class="index == genreActive ? 'active' : ''" @click="changeGenreActive(index), $emit('getMoviesOfGenre', genre.id)">
                <h2>{{genre.name}}</h2>
            </div>
        </div>
    </section>
</template>

<style scoped>
    section {
        width: 100%;
        height: 70px;
    }

    .genres {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow-x: auto;
        padding: 0 20px;
        gap: 20px;
    }

    .genres::-webkit-scrollbar {
        height: 5px;
        color: var(--secondary);
        margin-bottom: 3px;
    }

    .genres::-webkit-scrollbar-track {
        background: var(--background);
        border-radius: 20px;
    }

    .genres::-webkit-scrollbar-thumb {
        background: var(--secondary);
        border-radius: 20px;
        margin-bottom: 3px;
    }

    .genre {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        min-width: 140px;
        max-width: 200px;
        height: 40px;
        border: 2px solid var(--secondary);
        padding: 0.2%;
        border-radius: 20px;
        cursor: pointer;
        transition: all .3s;
    }

    .genre:hover {
        background-color: var(--secondary);
        color: var(--background);
    }

    .active {
        background-color: var(--secondary);
        color: var(--background);
    }
</style>