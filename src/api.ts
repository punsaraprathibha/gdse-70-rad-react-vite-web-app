import axios from 'axios';

export const backendApi = axios.create({
    baseURL: 'http://localhost:3000/api'
});