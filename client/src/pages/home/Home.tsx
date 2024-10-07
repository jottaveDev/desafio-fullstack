import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupInterceptor } from '../../services/interceptor';
import AddTask from './addTask/AddTask';
import useTasks from './hooks/useTasks';
import Tasks from './tasks/Tasks';

const Home = () => {
    const navigate = useNavigate();
    const { tasks, setTasks } = useTasks();

    const handleLogout = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        setupInterceptor(handleLogout);
    }, [handleLogout]);

    return (
        <main className="relative flex justify-center items-center min-h-screen">
            <section className="min-w-96">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Lista de Tarefas</h1>
                </header>
                <AddTask setTasks={setTasks} />
                <Tasks tasks={tasks} setTasks={setTasks} />
            </section>
            <footer className="absolute bottom-0 p-8">
                <button
                    className="block font-semibold p-2 cursor-pointer bg-gray-950 border-none rounded text-white text-sm duration-300 hover:opacity-80"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </footer>
        </main>
    );
};

export default Home;
