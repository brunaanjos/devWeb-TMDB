<script setup>
import { ref, computed } from 'vue';
import { useTvStore } from '@/stores/tv';
import { useRouter } from 'vue-router';

const tvStore = useTvStore();
const router = useRouter();
const topRatedTv = computed(() => tvStore.topRatedTv);

const listTv = ref(null);
const activeMovie = ref(0);
const pageActive = ref(0);
const tvPerPage = 8;

const pageTv = computed(()=> {
    return Math.ceil(topRatedTv.value.length / tvPerPage);
}) 
  
function changePage(index) {  
    pageActive.value = index;
    activeMovie.value = index * tvPerPage;
    listTv.value[activeMovie.value].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
}

function nextMovie() {
    if (activeMovie.value < topRatedTv.value.length - tvPerPage) {
        activeMovie.value++;
    }
    if(activeMovie.value % tvPerPage == 0) {
        pageActive.value++;
    }
    listTv.value[activeMovie.value].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });}

function backMovie() {
    if (activeMovie.value > 0) {
        activeMovie.value--;
    }
    if(activeMovie.value % tvPerPage == 0) {
        pageActive.value--;
    }
    listTv.value[activeMovie.value].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
}

function openTv(id) {
    router.push({ name: 'Item',  params: { id: id, type: 'tv' }})
}

</script>

<template>
    <section>
        <h2>
            Series mais bem avaliadas
        </h2>
        <div class="tvs" >
        <div class="tv" v-for="tv, index in topRatedTv" :key="index" ref="listTv" @click="openTv(tv.id)">
            <img :src="`https://image.tmdb.org/t/p/original${tv.poster_path}`" alt="">
        </div>
    </div>

        <div class="pages">
            <span v-for="(i, index) in pageTv" :class="index == pageActive ? 'active' : ''" @click="changePage(index)">
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
    .tvs {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        gap: 20px;
        align-items: center;
        width: 91%;
        margin: auto;
    }

    .tv {
        width: 200px;
        min-width: 200px;
        height: 330px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .tv img {
        width: 100%;
        height: 300px;
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