import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import Edit from '../../../assets/edit.svg';
import Trash from '../../../assets/trash.svg';
import Icon from '../../../components/icon/Icon';
import { ITaskProps } from '../../../models/task';
import { DELETE_TASK } from '../../../services/tasksService';
import styles from './tasks.module.css';

type TasksProps = {
    tasks: ITaskProps[];
    setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>;
};
const Tasks = ({ tasks, setTasks }: TasksProps) => {
    const navigate = useNavigate();

    const onDelete = async (taskId: number) => {
        try {
            const response = await DELETE_TASK(taskId);
            setTasks((prevTasks: ITaskProps[]) =>
                prevTasks.filter((task) => task.id !== taskId)
            );
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response);
            }
        }
    };

    const onEdit = async (taskId: number) => {
        navigate(`/edit/${taskId}`);
    };

    if (tasks.length === 0)
        return <p className={styles.notTasks}>Nenhuma tarefa encontrada.</p>;
    return (
        <ul>
            {tasks.map((task: ITaskProps) => (
                <li
                    key={task.id}
                    style={{
                        textDecoration: `${task.status ? 'line-through' : ''}`,
                    }}
                >
                    <p>{task.title}</p>
                    <div className={styles.icons}>
                        <Icon
                            src={Edit}
                            alt="Edit icon"
                            onClick={() => onEdit(task.id)}
                        />
                        <Icon
                            src={Trash}
                            alt="Trash icon"
                            onClick={() => onDelete(task.id)}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default Tasks;
