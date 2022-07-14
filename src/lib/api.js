import axios from "axios";

export const BackendAPI = axios.create({
    baseURL: 'http://localhost:8000/api',
});