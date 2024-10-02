import axios from 'axios';
import { getToken, isTokenValid } from '../helpers/token';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        const isAuthRoute = config.url === '/login' || config.url === '/users';

        if (token && isTokenValid() && !isAuthRoute) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const setupInterceptor = (onLogout: () => void) => {
    api.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                onLogout();
            }
            return Promise.reject(error);
        }
    );
};

export { api, setupInterceptor };
