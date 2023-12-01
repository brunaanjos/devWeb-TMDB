import { defineStore } from "pinia";
import searchService from "@/api/search";

import { useOthersStore } from "./others";
const othersStore = useOthersStore();

export const useSearchStore = defineStore("search", {
    state: () => {
        return {
            movies: [],
            tvs: []
        };
    },
    actions: {
        async getSearch(query) {
            othersStore.toggleLoader();
            const movie = await searchService.getSearchMovie(query)
            const tv = await searchService.getSearchTv(query)
            this.movies = movie;
            this.tvs = tv;
            othersStore.toggleLoader();
        }
    }

})