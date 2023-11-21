import axios, { AxiosRequestConfig } from 'axios';
// import axios, { AxiosRequestHeaders } from 'axios';
// import authHeader from './auth-header';

const APIURL = axios.create({
    baseURL: process.env.REACT_APP_API_URL
    // headers: authHeader() as AxiosRequestHeaders
});

APIURL.interceptors.request.use(
    function(config: AxiosRequestConfig) {
        const userStr = localStorage.getItem('user');
        let user = null as { access_token: string } | null;
        if (userStr) {
            user = JSON.parse(userStr);
            if (config.headers) {
                config.headers['x-access-token'] = user!.access_token;
            }
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);
export default APIURL;
