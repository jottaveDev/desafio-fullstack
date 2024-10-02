import { TaskController } from '../controllers/task.js';
import { UserController } from '../controllers/user.js';
import { TaskRepository } from '../respositories/task.js';
import { UserRepository } from '../respositories/user.js';
import { TaskService } from '../services/task.js';
import { UserService } from '../services/user.js';

export const generateUserController = () => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    return userController;
};

export const generateTaskController = () => {
    const taskRepository = new TaskRepository();
    const taskService = new TaskService(taskRepository);
    const taskController = new TaskController(taskService);
    return taskController;
};

export const generateTaskControllerWithUser = () => {
    const taskRepository = new TaskRepository();
    const userRepository = new UserRepository();
    const taskService = new TaskService(taskRepository, userRepository);
    const taskController = new TaskController(taskService);
    return taskController;
};
