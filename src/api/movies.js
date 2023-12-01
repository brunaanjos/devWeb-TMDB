import axios from 'axios';
class MoviesService {
    async getPopularMovies() {
        const { data } = await axios.get('/trending/movie/day?language=pt-br', )
        return data;
    }
    async getTopRatedMovies() {
        const { data } = await axios.get('/movie/top_rated?language=pt-br', )
        return data;
    }
    async getTrailerMovie(id) {
        const { data } = await axios.get(`/movie/${id}/videos?language=pt-br`, )
        if (data.results.lenght == 0) return null;
        for (let movie of data.results) {
            if (movie.type == 'Trailer') {
                return movie.key;
            }
        }
    }
    async getGenreMovies() {
        const { data } = await axios.get('/genre/movie/list?language=pt-br', )
        return data.genres;
    }
    async getMoviesOfGenre(id) {
        const { data } = await axios.get(`/discover/movie?with_genres=${id}&language=pt-br`, )
        return data;
    }
}

export default new MoviesService();