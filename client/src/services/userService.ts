import { IUser } from '../models/user';
import { api } from './interceptor';

export const CREATE_USER = async ({ email, password }: IUser) => {
    return await api.post(`/users`, {
        email: email,
        password: password,
    });
};

export const LOGIN = async ({ email, password }: IUser) => {
    return await api.post(`/login`, {
        email: email,
        password: password,
    });
};
