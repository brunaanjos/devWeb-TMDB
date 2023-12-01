import { defineStore } from "pinia";
import tvService from "@/api/tv";

export const useTvStore = defineStore("tv", {
    state: () => {
        return {
            popularTv: [],
            topRatedTv: [],
            genreTv: [],
        };
    },
    actions: {
        async getPopularTv() {
            const data = await tvService.getPopularTv()
            this.popularTv = data.results;
            this.getTrailerTv(this.popularTv);
            this.getGenreOfTv(this.popularTv);  
        },
        async getTopRatedTv() {
            const data = await tvService.getTopRatedTv()
            this.topRatedTv = data.results;
            this.getTrailerTv(this.topRatedTv);
            this.getGenreOfTv(this.topRatedTv);
        },
        async getTrailerTv(tvs) {
            for(let tv of tvs) {
                const { data } = await tvService.getTrailerTv(tv.id)
                tv.trailer = data;
            }
        },
        async getGenreTv() {
            const data = await tvService.getGenreTv()
            this.genreTv = data;
        },
        getGenreOfTv(tvs) {
            for(let tv of tvs) {
                const genreIds = tv.genre_ids;
                tv.genres = [];
                for(let genreId of genreIds) {
                    for(let genre of this.genreTv) {
                        if(genreId == genre.id) {
                            tv.genres.push(genre.name);
                        }
                    }
                }
            }
      },
      async getTvOfGenre(id) {
        const data = await tvService.getTvOfGenre(id);
        return data.results;
      }
    }
});