import { BaseSyntheticEvent, FormEvent, useState } from 'react';
import { ITaskProps } from '../../../models/task';
import { CREATE_TASK } from '../../../services/tasksService';
import styles from './addTask.module.css';

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>;
};
const AddTask = ({ setTasks }: AddTaskProps) => {
    const [taskValue, setTaskValue] = useState('');

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const { data } = await CREATE_TASK(taskValue);
            setTaskValue('');
            setTasks((prevTasks: ITaskProps[]) => [...prevTasks, data]);
        } catch (error) {
            console.error(error);
        }
    };

    const onChange = ({ target }: BaseSyntheticEvent) =>
        setTaskValue(target.value);

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <input
                type="text"
                placeholder="Digite sua tarefa"
                value={taskValue}
                onChange={onChange}
            />
            <button type="submit" className={styles.button}>
                Adicionar
            </button>
        </form>
    );
};

export default AddTask;
