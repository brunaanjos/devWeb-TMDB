<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    tv: Object,
})

function goToDetails() {
    console.log(props.tv.id)
    router.push({ name: 'Item',  params: { id: props.tv.id, type: 'tv' }})
}
</script>

<template>
    <section @click="goToDetails">
        <img :src="`https://image.tmdb.org/t/p/original${tv.poster_path}`" :alt="tv.name">
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