import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/'

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODcwYTBiNDcyYzYwNzBlZWU1ZGQxMmQyM2MyMGE0MCIsInN1YiI6IjY1MDQ2OGY4NmEyMjI3MDBmZDIyNDE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4AAm7c6_TRm5sWDVM6Bl2SWGcsQA6ihqnEcuKlWxIpw'


axios.defaults.headers = {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
}