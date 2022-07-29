import axios from "axios";

export const BackendAPI = axios.create({
    baseURL: 'http://localhost:8000/api',
});


export const APIErrorHandler = error => {
    let alert;
    if (error.response?.status === 400 && (typeof error.response?.data?.message === 'object')) {
        error.response.data.message.map(message => {
            alert += message + " | ";
        })
        return alert;
    }

    alert = error.response?.data?.message ?? error.response?.data?.error ?? "A network error occured. Please make sure you are connected to the internet"

    return alert;
}