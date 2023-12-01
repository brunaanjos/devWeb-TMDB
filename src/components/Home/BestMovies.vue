<script setup>
import { onMounted, ref, computed } from 'vue';
import { useMoviesStore } from '@/stores/movies';
import { useRouter } from 'vue-router';

const movieStore = useMoviesStore();
const router = useRouter();
const bestMovies = computed(() => movieStore.popularMovies);
const activeMovie = ref(0);
const listMovies = ref(null);

function nextMovie() {
    if (activeMovie.value < bestMovies.value.length - 1) {
        activeMovie.value++;
    }
    console.log(listMovies.value[activeMovie.value]);
    listMovies.value[activeMovie.value].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest'  });

}
  
function backMovie() {
    if (activeMovie.value > 0) {
        activeMovie.value--;
    }
    listMovies.value[activeMovie.value].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest'  });
}

function changeMovie(index) {
    activeMovie.value = index;

    listMovies.value[activeMovie.value].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest'  });

}

function openMovie(id) {
    router.push({ name: 'Item',  params: { id: id, type: 'movie' }})
}

</script>

<template>
    <div class="container">
        <img :src="`https://image.tmdb.org/t/p/original${bestMovies[activeMovie]?.backdrop_path}`" alt="" class="back">
        <div class="activeMovie">

            <iframe
                :src="`https://www.youtube.com/embed/${bestMovies[activeMovie]?.trailer}`"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen class="trailer"></iframe>

            <div class="info">
                <h3>{{ bestMovies[activeMovie]?.title }}</h3>

                <p class="resume">
                    {{ bestMovies[activeMovie]?.overview }}
                </p>

                <div class="actions">
                    <button @click="openMovie(bestMovies[activeMovie].id)">
                        Ver Mais
                    </button>
                </div>
            </div>
        </div>

        <div class="pagination">
            <button class="arrowBack" @click="backMovie">
                <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon"/>
            </button>

            <div class="listMovies">
                <div v-for="movie, index in bestMovies" :key="movie.id" :class="index == activeMovie ? 'active' : ''" class="movie" @click="changeMovie(index)" ref="listMovies">
                    <span class="rating">
                        {{ Number(movie.vote_average).toFixed(1) }}
                    </span>
                    <p>
                        {{ movie.title }}
                    </p>
                </div>
            </div>

            <button class="arrowNext" @click="nextMovie">
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="icon"/>
            </button>
        </div>
    </div>
</template>

<style scoped>

.container {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    border-bottom: 5px solid var(--secondary);
}
.back {
    position: absolute;
    width: 100%;
    height: 600px;
    object-fit: cover;
    object-position: 0 2px;
    opacity: .1;
}

.activeMovie {
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 100px;
}

.activeMovie iframe {
    width: 80%;
    height: 80%;
    max-width: 680px;
    max-height: 340px; 
    margin-top: 20px;
}

.activeMovie .trailer {
    z-index: 2;
}

.activeMovie .info {
    width: 80%;
    max-width: 600px;
    font-size: 1.6rem;
    text-align: justify;
    display: flex;
    flex-direction: column;
    gap: 40px;
    z-index: 2;
}

.activeMovie .info h3 {
    font-size: 2.5rem;
    font-weight: bold;
    text-transform: uppercase;
}

.activeMovie .actions {
    display: flex;
    gap: 20px;
}

.activeMovie .actions button {
    background-color: var(--tertiary);
    color: var(--text);
    border: none;
    border-radius: 5px;
    padding: 1% 3%;
    font-size: 1.6rem;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
}

.pagination {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 0 5%;
    z-index: 2;
    overflow: hidden;
}

.pagination .arrowBack, .pagination .arrowNext {
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: 2px solid #ffffff50;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
}

.pagination .arrowBack .icon, .pagination .arrowNext .icon {
    color: #ffffff;
    font-size: 2rem;
}

.pagination .listMovies {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 90%;
    overflow: hidden;
}

.pagination .listMovies .movie {
    width: 150px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: #00000050;
    border-radius: 5px;
    min-width: 150px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
}

.pagination .listMovies .movie .rating {
    width: 30px;
    height: 30px;
    background-color: var(--secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 1rem;
}

.pagination .listMovies .movie p {
    width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.pagination .listMovies .active {
    background-color: var(--secondary);
}

.pagination .listMovies .active .rating {
    background-color: var(--text);
    color: var(--secondary);
}

@media screen and (max-width: 1379px) {
    .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: 5px solid var(--secondary);
    height: 100%;
    }

    .back {
        height: 100%;
    }

    .activeMovie {
        gap: 50px;
        height: 100%;
    }

    .activeMovie iframe {
        min-height: 300px;
    }
}
</style>