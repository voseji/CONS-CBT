import axios from "axios";

export const BACKEND_HOST = "http://localhost:8000/api";

export const BackendAPI = axios.create({
    baseURL: BACKEND_HOST,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        ContentType: 'application/json'
    }
});



// export const handleAPIError = error => {
//   let message = '';
//     if (error?.response?.status === 422) {
//       const errors = error?.response?.data?.errors;
//       for (let field in errors) {
//         message += errors[field].toString() + " | ";
//       }
//       return message;
//     }
//     if (error?.statusCode === 400 && typeof error?.message === 'array') {
//       error.message.map(msg => message += (msg + " | "));
//       return message;
//     }

//     message =  error?.response?.data?.message || "A possible network error occured. Make sure you are connected to the internet";

//     return message;
// }