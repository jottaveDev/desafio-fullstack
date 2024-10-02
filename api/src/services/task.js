import { TaskAlreadyExistsError, TaskNotFoundError } from '../errors/task.js';
import { UserNotFoundError } from '../errors/user.js';

export class TaskService {
    constructor(taskRepository, userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    async getAll(userId) {
        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw new UserNotFoundError(userId);
        }
        return this.taskRepository.getAll(userId);
    }

    async getById(taskId) {
        const task = await this.taskRepository.getById(taskId);
        if (!task) {
            throw new TaskNotFoundError(taskId);
        }
        return task;
    }

    async create(taskParams) {
        const user = await this.userRepository.getById(taskParams.user_id);
        if (!user) {
            throw new UserNotFoundError(taskParams.userId);
        }
        const task = await this.taskRepository.getByTitle(taskParams.title);
        if (task) {
            throw new TaskAlreadyExistsError(task.title);
        }
        return this.taskRepository.create(taskParams);
    }

    async update(taskId, taskParams) {
        const task = await this.taskRepository.getById(taskId);
        if (!task) {
            throw new TaskNotFoundError(taskId);
        }
        if (taskParams.title) {
            const titleExists = await this.taskRepository.getByTitle(
                taskParams.title,
            );
            if (titleExists) {
                throw new TaskAlreadyExistsError(taskParams.title);
            }
        }
        return this.taskRepository.update(taskId, taskParams);
    }

    async delete(taskId) {
        const task = await this.taskRepository.getById(taskId);
        if (!task) {
            throw new TaskNotFoundError(taskId);
        }
        return this.taskRepository.delete(taskId);
    }
}
