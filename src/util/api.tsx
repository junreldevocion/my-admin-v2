import axios from 'axios'
import { logOut } from './auth';

export default function api() {

    const isDev = process.env.NODE_ENV === 'development'

    console.log(isDev);
    
    
    
    const api = axios.create({
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
