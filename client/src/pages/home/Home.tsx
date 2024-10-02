import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupInterceptor } from '../../services/interceptor';
import AddTask from './addTask/AddTask';
import styles from './home.module.css';
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
        <main>
            <section className={styles.section}>
                <header className={styles.header}>
                    <h1>Lista de Tarefas</h1>
                </header>
                <AddTask setTasks={setTasks} />
                <Tasks tasks={tasks} setTasks={setTasks} />
            </section>
            <footer>
                <button onClick={handleLogout}>Logout</button>
            </footer>
        </main>
    );
};

export default Home;
