import axios from 'axios'
import { logOut } from './auth';

export default function api() {

    const isDev = process.env.NODE_ENV === 'development'

    let baseUrl: string = "http://127.0.0.1:8000";

    if (!isDev) {
        baseUrl = 'https://my-admin-api-v2.herokuapp.com/'
    }

    const api = axios.create({
        baseURL: baseUrl,
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
