<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { useSearchStore } from '@/stores/search';
    import { useRouter } from 'vue-router';

    const searchStore = useSearchStore();

    const router = useRouter();

    const props = defineProps({
        query: {
            type: String,
            required: true
        }
    })

    const movies = computed(()=> searchStore.movies);;
    const tvs = computed(()=> searchStore.tvs);

    const showMovies = ref(true);
    const showTvs = ref(true);

    function goToDetails(id, type) {
        router.push({ name: 'Item',  params: { id, type }})
    }

    onMounted(async()=> {
        await searchStore.getSearch(props.query);
        console.log(movies.value, tvs.value)
    })
</script>

<template>
    <main>
        <h3>
            {{ movies.length + tvs.length}} resultados de "{{ props.query }}" 
        </h3>

        <span class="filters">
            <span class="filter">
                <input type="checkbox" v-model="showMovies">
                <p>Filmes ({{ movies.length }})</p>
            </span>

            <span class="filter">
                <input type="checkbox" v-model="showTvs">
                <p>Séries ({{ tvs.length }})</p>
            </span>
        </span>

        <section class="results">
            <div v-for="movie in movies" :key="movie.id" class="movie" @click="goToDetails(movie.id, 'movie')" v-if="showMovies">
                <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" :alt="movie.name">
            </div>

            <div v-for="tv in tvs" class="tv" :key="tv.id" @click="goToDetails(tv.id, 'tv')" v-if="showTvs">
                <img :src="`https://image.tmdb.org/t/p/original${tv.poster_path}`" :alt="tv.name">
            </div>
        </section>
    </main>
</template>

<style scoped>
main {
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 30px; 
}

h3 {
    font-size: 20px;
    font-weight: 500;
    color: var(--text);
}

.filters {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.filters .filter{
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    font-size: 1.6rem;
}

.filters .filter input {
    width: 20px;
    height: 20px;
    cursor: pointer;
    
}

.results {
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
}
    .tv {
        width: 200px;
        height: 330px;
        cursor: pointer;
    }

    .tv img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }

    .movie {
        width: 200px;
        height: 330px;
        cursor: pointer;
    }

    .movie img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
</style>