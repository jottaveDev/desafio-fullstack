import { jwtDecode } from 'jwt-decode';

type decodedProps = {
    id: number;
    exp: number;
    iat: number;
};
export const getUserIdFromToken = (token: string) => {
    if (!token) return null;
    try {
        const decoded: decodedProps = jwtDecode(token);
        return decoded.id;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => {
    const token = getToken();
    return token !== null;
};

export const isTokenValid = () => {
    const token = getToken();
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    return !isExpired;
};
