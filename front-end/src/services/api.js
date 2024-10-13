import axios from 'axios';

// mengambil endpoint dari route backend
const Api = axios.create({
    baseURL: 'http://localhost:3000/'
})

export default Api