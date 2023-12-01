<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    movie: Object,
})

function goToDetails() {
    console.log(props.movie.id)
    router.push({ name: 'Item',  params: { id: props.movie.id, type: 'movie' }})
}
</script>

<template>
    <section>
        <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" :alt="movie.title" @click="goToDetails">
    </section>
</template>

<style scoped>
    section {
        width: 200px;
        height: 330px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
</style>