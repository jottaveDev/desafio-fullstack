import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { getToken, getUserIdFromToken } from '../../../../helpers/token';
import { ITaskProps } from '../../../../models/task';
import { GET_TASKS } from '../../../../services/tasksService';

const useTasks = () => {
    const [tasks, setTasks] = useState<ITaskProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    const token = getToken();
    const userId = getUserIdFromToken(token as string);

    const fetchTasks = useCallback(async () => {
        try {
            if (userId) {
                const { data } = await GET_TASKS();
                setTasks(data);
                return data;
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.message);
                console.log(err);
            }
        }
    }, [userId]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return { tasks, error, fetchTasks, setTasks };
};

export default useTasks;
