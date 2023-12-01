<script setup>
import { onMounted, ref } from 'vue';
import { useDetailsStore } from '@/stores/details'
import Loading from 'vue-loading-overlay';

const detailsStore = useDetailsStore();
const isLoading = ref(false);

const props = defineProps({
    id: Object,
    type: String
})

const item = ref({
    title: '',
    backdrop_path: '',
    original_title: '',
    overview: '',
    poster_path: '',
    release_date: '',
    vote_average: '', 
    vote_count: '',
    genres: [],
    spoken_languages: [],
    age: {
    },
    
});

const showTrailer = ref(false)

onMounted(async ()=> {
    isLoading.value = true;
    if(props.type == 'movie') item.value = await detailsStore.getDetailsMovie(props.id);
    else if (props.type == 'tv') item.value = await detailsStore.getDetailsTv(props.id);
    isLoading.value = false;
    console.log(item.value)
})
</script>

<template>
    <main>
        <loading v-model:active="isLoading" is-full-page :background-color="'#D90452'" :opacity="'1'"/> 

        <div class="banner">
            <img :src="`https://image.tmdb.org/t/p/original${item.backdrop_path}`" alt="">
        </div>

        <div class="actions">
            <img :src="`https://image.tmdb.org/t/p/original${item.poster_path}`" alt="">

            <button @click="showTrailer = true" v-if="item.trailer">
                Ver Trailer
            </button>
        </div>

        <div class="info">
            <h2 class="title" v-if="props.type == 'movie'">
                {{ item.title }}
            </h2>

            <h2 class="title" v-else>
                {{ item.name }}
            </h2>

            <p class="age" v-if="props.type == 'movie'">
                {{ item.age }}
            </p>


            <div class="genres">
                <span v-for="(genre, index) in item.genres" :key="index">
                    <p>{{ genre.name }}</p>
                    <p v-if="index < item.genres.length - 1">/</p>
                </span>
            </div>

            <span class="dot" v-if="props.type == 'movie'"></span>

            <p class="date" v-if="props.type == 'movie'">
                {{ item.release_date }}
            </p>

            <h3 class="tagline">
                {{ item.tagline }}
            </h3>

            <p class="overview">
                {{ item.overview }}
            </p>
        </div>
        <span class="trailer" v-if="showTrailer">
            <button @click="showTrailer = false"><font-awesome-icon :icon="['fas', 'arrow-right']" style="color: #fff;"/></button>
                <iframe
                :src="`https://www.youtube.com/embed/${item?.trailer}`"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen class="trailer"></iframe>
        </span>
    </main>
</template>

<style scoped>
    main {
        width: 100%;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 50px;
    }

    .banner {
        width: 100%;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
        position: relative;
        opacity: 0.2;
    }

    .banner img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .actions {
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        top: -200px;
    }

    .actions img {
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
        position: relative;
    }

    .actions button {
        width: 100%;
        height: 50px;
        border-radius: 5px;
        border: none;
        background-color: #D90452;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        margin: 10px 0;
        cursor: pointer;
    }

    .info {
        position: relative;
        height: 100%;
        width: 40%;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        row-gap: 5px;
        align-items: self-start;
        justify-content: start;
        min-width: 300px;
    }

    .title {
        width: 100%;
        font-size: 3.0rem;
    }

    .age {
        font-size: 1.2rem;
        border-radius: 5px;
        border: 1px solid var(--text);
        padding: 1px 4px;
    }

    .tagline {
        width: 100%;
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--text);
        opacity: 0.5;
    }

    .genres {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .genres span {
        display: flex;
        gap: 5px;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--text);
    }

    .date {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--text);
    }

    .overview {
        width: 100%;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--text); 
    }

    .dot {
        content: '';
        background-color: var(--text);
        width: 5px;
        height: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        position: relative;
        top: 7px;
    }

    .trailer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        z-index: 100;
        padding: 10% 2%;
    }

    .trailer iframe {
        margin: auto;
    }

    .trailer button {
        position: absolute;
        top: 10px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        color: #fff;
        font-size: 20px;
        background-color: transparent;
        font-weight: bold;
        cursor: pointer;
        z-index: 101;
    }

    @media screen and (max-width: 750px) {
        .info {
            top: -200px;
        }        
    }
</style>