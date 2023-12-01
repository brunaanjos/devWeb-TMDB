import axios from "axios";

class DetailsService {
    async getDetailsMovie(id) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=pt-br`)
        return data;
    }
    async getAgeMovie(id) {
        try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/release_dates?language=pt-br`)
        console.log(data.results)
        for(let age of data.results) {
            if(age.iso_3166_1 == "BR") {
                console.log(age.release_dates[0].certification )
                return age.release_dates[0].certification  ;
            }
            else {
                return '?';
            }
        }
        }
        catch(err) {
            console.log(err)
        }
    }
    async getDetailsTv(id) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=pt-br`)
        return data;
    }
}

export default new DetailsService();