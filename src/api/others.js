import axios from "axios";

class OthersService {
    async getMoviesOfGenres() {
        const { data } = await axios.get('/genre/movie/list?language=pt-br')
        return data.genres;
    }
}

export default new OthersService();