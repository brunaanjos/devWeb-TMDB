import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/'

const token = 'eyJhbGci0iJIUZI1NiJ9.eyJhdWQiOiI3 ODcwYTBiNDcyYzYwNzB1ZWU1ZGQxMmQyM2MyMGE@MCISIn N1YiI6IjY1MDQ20GY4NmEyMjI3MDBmZDIyNDE4YyIsInN jb3BlcyI6WyJhcG1fcmVhZCJdLCJ2ZXJzaW9uIjoxfQ. 4AAm7c6_TRm5sWDVM6B12SWGcsQA6ihqnEcuK1WxIpw'

axios.defaults.headers = {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
}