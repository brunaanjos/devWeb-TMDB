import { defineStore } from "pinia";
import othersService from "@/api/others";

export const useOthersStore = defineStore("others", {
    state: () => {
        return {
            genres: [],
            loader: false
        };
    },
    actions: {
        async getGenres() {
            const data = await othersService.getGenres()
            this.genres = data;
        },
        toggleLoader() {
            this.loader = !this.loader;
        }
    }

})