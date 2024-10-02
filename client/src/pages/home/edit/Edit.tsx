import { AxiosError } from 'axios';
import { BaseSyntheticEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../../helpers/token';
import { EDIT_TASK, GET_TASK } from '../../../services/tasksService';
import styles from './edit.module.css';

const Edit = () => {
    const [taskValue, setTaskValue] = useState('');
    const navigate = useNavigate();
    const { taskId } = useParams();
    const token = getToken();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await GET_TASK(taskId as string);
                setTaskValue(data.title);
                return data;
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [taskId, token]);

    const onChange = ({ target }: BaseSyntheticEvent) =>
        setTaskValue(target.value);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const { data } = await EDIT_TASK(taskId as string, taskValue);
            navigate('/');
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response);
            }
        }
    };

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <header className={styles.header}>
                    <h1>Editar tarefa</h1>
                </header>
                <form onSubmit={onSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Digite sua tarefa"
                        value={taskValue}
                        onChange={onChange}
                    />
                    <button type="submit" className={styles.button}>
                        Editar
                    </button>
                </form>
                <button onClick={() => navigate('/')}>Voltar</button>
            </section>
        </main>
    );
};

export default Edit;
