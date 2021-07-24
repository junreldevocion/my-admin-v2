import axios from 'axios'
import { logOut } from './auth';

export default function api() {
    const api = axios.create({
        // baseURL: 'http://127.0.0.1:8000',
        baseURL: 'https://my-admin-api-v2.herokuapp.com/',
        withCredentials: true 
    });

    api.interceptors.response.use(response => response, error => {
        if (error.response.status === 401) {
            logOut()
            
            return Promise.reject()
        }

        return Promise.reject(error)
    })

    return api;
}