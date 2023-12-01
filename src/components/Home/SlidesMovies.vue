<script setup>
import { ref, computed } from 'vue';
import { useMoviesStore } from '@/stores/movies';
import { useTvStore } from '@/stores/tv';
import { useRouter } from 'vue-router';

const movieStore = useMoviesStore();
const tvStore = useTvStore();
const router = useRouter();
const topRatedMovies = computed(() => movieStore.topRatedMovies);

const listMovies = ref(null);
const activeMovie = ref(0);
const pageActive = ref(0);
const moviesPerPage = 8;

const pageMovies = computed(()=> {
    return Math.ceil(topRatedMovies.value.length / moviesPerPage);
}) 
  
function changePage(index) {
    pageActive.value = index;
    activeMovie.value = index * moviesPerPage;
    listMovies.value[activeMovie.value].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
}
 
function nextMovie() {
    if (activeMovie.value < topRatedMovies.value.length - moviesPerPage) {
        activeMovie.value++; 
    }
    if(activeMovie.value % moviesPerPage == 0) {
        pageActive.value++;
    }
    listMovies.value[activeMovie.value].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
}

function backMovie() {
    if (activeMovie.value > 0) { 
        activeMovie.value--;
    }
    if(activeMovie.value % moviesPerPage == 0) {
        pageActive.value--;
    }
    listMovies.value[activeMovie.value].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
}

function openMovies(id) {
    router.push({ name: 'Item',  params: { id: id, type: 'movie' }})
}

</script>

<template>
    <section>
        <h2>
            Filmes mais bem avaliados
        </h2>
        <div class="movies" >
        <div class="movie" v-for="movie, index in topRatedMovies" :key="index" ref="listMovies" @click="openMovies(movie.id)">
            <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="">
        </div>
    </div>

        <div class="pages">
            <span v-for="(i, index) in pageMovies" :class="index == pageActive ? 'active' : ''" @click="changePage(index)">
            </span>
        </div>

        <div class="actions">
            <button class="arrowBack" @click="backMovie">
                <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon"/>
            </button>

            <button class="arrowNext" @click="nextMovie">
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="icon"/>
            </button>
        </div>
    </section>
</template>

<style scoped>
    section {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        gap: 20px;
        align-items: center;
        width: 100%;
        margin: auto;
        flex-direction: column;
        justify-content: center;
    }

    h2 {
        font-size: 2.5rem;
        width: 92%;
        text-align: start; 
    }
    .movies {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        gap: 20px;
        align-items: center;
        width: 91%;
        margin: auto;
    }

    .movie {
        width: 200px;
        min-width: 200px;
        height: 330px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .movie img {
        width: 100%;
        object-fit: cover;
        cursor: pointer;
        border-radius: 10px;
    }

    .pages {
        position: absolute;
        bottom: 0;
        display: flex;
        gap: 10px;
        margin: auto;
    }

    .pages span {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid var(--secondary);
        background-color: transparent;
        cursor: pointer;
        transition: .2s all;
    }

    .pages span:hover {
        background-color: var(--secondary);
    }

    .pages .active {
        background-color: var(--secondary);
    }

    .actions {
        position: absolute;
        display: flex;
        gap: 10px;
        width: 95%;
        align-items: center;
        justify-content: space-between;
    }

    .actions .arrowBack, .actions .arrowNext {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        color: #ffffff80;
        transition: all .3s;
    }

    .actions .arrowBack .icon, .actions .arrowNext .icon {
        font-size: 2rem;
    }

    .actions .arrowBack:hover, .actions .arrowNext:hover {
        color: #ffffff;
    }
</style>