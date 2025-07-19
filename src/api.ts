import axios from 'axios';

export const backendApi = axios.create({
    baseURL: 'http://localhost:3000/api'
});
// Add a request interceptor
backendApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);