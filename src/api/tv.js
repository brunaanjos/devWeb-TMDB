import axios from 'axios';

class TvService {
    async getPopularTv() {
        const { data } = await axios.get('/trending/tv/day?language=pt-br', )
        return data;
    }
    async getTopRatedTv() {
        const { data } = await axios.get('/tv/top_rated?language=pt-br', )
        return data;
    }
    async getTrailerTv(id) {
        const { data } = await axios.get(`/tv/${id}/videos?language=pt-br`, )
        if(data.results.lenght == 0) return null;
        for (let movie of data.results) {
            if (movie.type == 'Trailer') {
                return movie.key;
            }
        }
    }
    async getGenreTv() {
        const { data } = await axios.get('/genre/tv/list?language=pt-br', )
        return data.genres;
    }
    async getTvOfGenre(id) {
        const { data } = await axios.get(`/discover/tv?with_genres=${id}&language=pt-br`, )
        return data;
    }
}

export default new TvService();