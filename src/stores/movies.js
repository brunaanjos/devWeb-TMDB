import { defineStore } from "pinia"; 
import moviesService from "@/api/movies";

import { useOthersStore } from "./others";

export const useMoviesStore = defineStore("movies", {
  state: () => {
    return {
      popularMovies: [],
      topRatedMovies: [],
      genreMovies: [],
      othersStore: useOthersStore()
    };
  },
  actions: {
    async getPopularMovies() {
        const data = await moviesService.getPopularMovies()
        this.popularMovies = data.results;
        this.getTrailerMovies(this.popularMovies);
        this.getGenreOfMovie(this.popularMovies);
    },
    async getTopRatedMovies() {
        const data = await moviesService.getTopRatedMovies()
        this.topRatedMovies = data.results;
        this.getTrailerMovies(this.topRatedMovies);
        this.getGenreOfMovie(this.topRatedMovies);
    },
    async getTrailerMovies(movies) {
        for(let movie of movies) {
            const data = await moviesService.getTrailerMovie(movie.id)
            movie.trailer = data;
        }
    },
    async getGenreMovies() {
        const data = await moviesService.getGenreMovies()
        this.genreMovies = data;
    },
    getGenreOfMovie(movies) {
        this.othersStore.toggleLoader();
        for(let movie of movies) {
            const genreIds = movie.genre_ids;
            movie.genres = [];
            for(let genreId of genreIds) {
                for(let genre of this.genreMovies) {
                    if(genreId == genre.id) {
                        movie.genres.push(genre.name);
                    }
                }
            }
        }
        setTimeout(() => {
            this.othersStore.toggleLoader();
        }, 700);
  },
  async getMoviesOfGenre(id) {
    const data = await moviesService.getMoviesOfGenre(id)
    return data.results;
  }
}
});
