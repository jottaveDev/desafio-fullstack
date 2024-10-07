import { BaseSyntheticEvent, FormEvent, useState } from 'react';
import { ITaskProps } from '../../../models/task';
import { CREATE_TASK } from '../../../services/tasksService';

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
        <form
            onSubmit={onSubmit}
            className="flex items-center justify-between py-8"
        >
            <input
                type="text"
                placeholder="Digite sua tarefa"
                value={taskValue}
                onChange={onChange}
                className="w-full max-w-64 px-4 py-2 border border-solid border-gray-300 outline-none rounded"
            />
            <button
                type="submit"
                className="block font-semibold p-2 cursor-pointer bg-zinc-950 border-none rounded text-sm duration-300 text-white hover:opacity-80"
            >
                Adicionar
            </button>
        </form>
    );
};

export default AddTask;
