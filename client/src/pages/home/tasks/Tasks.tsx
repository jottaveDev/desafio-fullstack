import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import Edit from '../../../assets/edit.svg';
import Trash from '../../../assets/trash.svg';
import Icon from '../../../components/icon/Icon';
import { ITaskProps } from '../../../models/task';
import { DELETE_TASK } from '../../../services/tasksService';

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
        return <p className="text-center py-8">Nenhuma tarefa encontrada.</p>;
    return (
        <ul className="list-none flex flex-col gap-4">
            {tasks.map((task: ITaskProps) => (
                <li
                    key={task.id}
                    className="flex items-center justify-between max-w-full p-4 bg-gray-300 rounded"
                    style={{
                        textDecoration: `${task.status ? 'line-through' : ''}`,
                    }}
                >
                    <p>{task.title}</p>
                    <div className="flex items-center gap-2">
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
