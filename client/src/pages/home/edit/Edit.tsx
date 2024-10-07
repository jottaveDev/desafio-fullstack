import { AxiosError } from 'axios';
import { BaseSyntheticEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../../helpers/token';
import { EDIT_TASK, GET_TASK } from '../../../services/tasksService';

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
        <main className="flex items-center justify-center min-h-screen flex-col">
            <section className="min-w-96">
                <header>
                    <h1 className="self-start text-left text-2xl font-bold">
                        Editar tarefa
                    </h1>
                </header>
                <form
                    onSubmit={onSubmit}
                    className="flex items-center gap-4 w-full py-8"
                >
                    <input
                        type="text"
                        placeholder="Digite sua tarefa"
                        className="w-full max-w-56 py-2 px-4 border border-solid border-gray-300 rounded outline-none"
                        value={taskValue}
                        onChange={onChange}
                    />
                    <button
                        type="submit"
                        className="block font-semibold p-2 cursor-pointer bg-gray-950 border-none rounded text-white text-sm duration-300 hover:opacity-80"
                    >
                        Editar
                    </button>
                </form>
                <button
                    className="block font-semibold p-2 cursor-pointer bg-gray-950 border-none rounded text-white text-sm duration-300 hover:opacity-80"
                    onClick={() => navigate('/')}
                >
                    Voltar
                </button>
            </section>
        </main>
    );
};

export default Edit;
