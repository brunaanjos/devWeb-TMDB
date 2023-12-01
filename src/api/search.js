import axios from "axios";

class SearchService {
    async getSearchMovie(query) {
        try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&language=pt-br&page=1`)
        return data.results;
        } catch(err) {
            console.log(err)
        }
    }
    async getSearchTv(query) {
        try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${query}&language=pt-br&page=1`)
        return data.results;
        } catch(err) { 
            console.log(err)
        }
    }
}

export default new SearchService();