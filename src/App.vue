<script setup>
import { onMounted, ref, computed } from 'vue';
import { useMoviesStore } from './stores/movies';
import { useTvStore } from './stores/tv';
import { useOthersStore } from './stores/others';
import Header from './components/Header.vue';
import Loading from 'vue-loading-overlay';

const movieStore = useMoviesStore();
const tvStore = useTvStore();
const othersStore = useOthersStore();

const isLoading = computed(()=> othersStore.loader);
onMounted(
  async () => {
    othersStore.toggleLoader();
    await movieStore.getGenreMovies();
    await movieStore.getTopRatedMovies();
    await movieStore.getPopularMovies();
    await tvStore.getGenreTv();
    await tvStore.getTopRatedTv();
    await tvStore.getPopularTv();
    othersStore.toggleLoader();
  }
)
</script>

<template>
  <loading v-model:active="isLoading" is-full-page :background-color="'#D90452'" :opacity="'1'"/> 
  <Header/>
  <RouterView/>
</template>