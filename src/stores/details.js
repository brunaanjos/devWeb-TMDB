import { defineStore } from "pinia";
import detailsService from "@/api/details";
import moviesService from "@/api/movies";
import tvService from "@/api/tv";

export const useDetailsStore = defineStore("details", {
    state: () => {
        return {
            data: []
        };
    },
    actions: {
        async getDetailsMovie(id) {
            const data = await detailsService.getDetailsMovie(id)
            data.age = await this.getAgeMovie(id)
            data.trailer = await this.getTrailerMovie(id)
            console.log(data);
            return data;
        },
        async getAgeMovie(id) {
            const data = await detailsService.getAgeMovie(id)
            console.log(data)
            return data;
        },
        async getDetailsTv(id) {
            const data = await detailsService.getDetailsTv(id)
            data.trailer = await this.getTrailerTv(id)
            console.log(data);
            return data;
        },
        async getTrailerMovie(id) {
            const data = await moviesService.getTrailerMovie(id)
            return data;
        },
        async getTrailerTv(id) {
            const data = await tvService.getTrailerTv(id)
            console.log(data)
            return data;
        }
    }

})