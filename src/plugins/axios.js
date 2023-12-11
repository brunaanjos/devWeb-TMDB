import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/'

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDZmMWM4Yjg3YzI0NWMyMmVjMDllYmU4ODZjMzQ4MSIsInN1YiI6IjY1MDQ2ODFlNjNhYWQyMDExYjIzNDQzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n_vjaEgmee38MnTts1K4Xfc2v6O0vNeirk1FZyU1yiE'

axios.defaults.headers = {
    accept: 'application/json',
    Authorization: `bearer ${token}`
}