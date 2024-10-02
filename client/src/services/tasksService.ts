import { getUserIdFromToken } from '../helpers/token';
import { ITaskProps } from '../models/task';
import { api } from './interceptor';

const token = localStorage.getItem('token');
const userId: number | null = getUserIdFromToken(token as string);

export const GET_TASKS = async () => {
    return await api.get<ITaskProps[]>(`/tasks?userId=${userId}`);
};

export const GET_TASK = async (taskId: string) => {
    return await api.get(`/tasks/${taskId}`);
};

export const CREATE_TASK = async (title: string) => {
    return await api.post(`/tasks`, {
        user_id: userId,
        title,
    });
};

export const EDIT_TASK = async (taskId: string, title: string) => {
    return await api.put(`/tasks/${taskId}`, {
        title,
    });
};

export const DELETE_TASK = async (taskId: number) => {
    return await api.delete(`/tasks/${taskId}`);
};
