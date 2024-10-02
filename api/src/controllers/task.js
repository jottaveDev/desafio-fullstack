import { ZodError } from 'zod';
import { TaskAlreadyExistsError, TaskNotFoundError } from '../errors/task.js';
import { UserNotFoundError } from '../errors/user.js';
import { badRequest, created, ok, serverError } from '../helpers/http.js';
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/validation.js';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.js';

export class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    async getAll(httpRequest) {
        try {
            const userId = Number(httpRequest.query.userId);
            if (!userId) {
                return badRequest({ message: 'The field userId is required.' });
            }
            const tasks = await this.taskService.getAll(userId);
            return ok(tasks);
        } catch (error) {
            console.error(error);
            if (error instanceof UserNotFoundError) {
                return badRequest({ message: error.message });
            }
            return serverError();
        }
    }

    async getById(httpRequest) {
        try {
            const taskId = Number(httpRequest.params.taskId);
            const idIsValid = checkIfIdIsValid(taskId);
            if (!idIsValid) {
                return invalidIdResponse();
            }
            const task = await this.taskService.getById(taskId);
            return ok(task);
        } catch (error) {
            console.error(error);
            if (error instanceof TaskNotFoundError) {
                return badRequest({ message: error.message });
            }
            return serverError();
        }
    }

    async create(httpRequest) {
        try {
            const taskParams = httpRequest.body;
            const userIdIsValid = checkIfIdIsValid(taskParams.user_id);
            if (!userIdIsValid) {
                return invalidIdResponse();
            }
            await createTaskSchema.parseAsync(taskParams);
            const task = await this.taskService.create(taskParams);
            return created(task);
        } catch (error) {
            console.error(error);
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message });
            }
            if (error instanceof UserNotFoundError) {
                return badRequest({ message: error.message });
            }
            if (error instanceof TaskAlreadyExistsError) {
                return badRequest({ message: error.message });
            }
            return serverError();
        }
    }

    async update(httpRequest) {
        try {
            const taskId = Number(httpRequest.params.taskId);
            const taskParams = httpRequest.body;
            await updateTaskSchema.parseAsync(taskParams);
            const taskUpdated = await this.taskService.update(
                taskId,
                taskParams,
            );
            return ok(taskUpdated);
        } catch (error) {
            console.error(error);
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message });
            }
            if (error instanceof TaskAlreadyExistsError) {
                return badRequest({ message: error.message });
            }
            return serverError();
        }
    }

    async delete(httpRequest) {
        try {
            const taskId = Number(httpRequest.params.taskId);
            const taskDeleted = await this.taskService.delete(taskId);
            return ok(taskDeleted);
        } catch (error) {
            console.error(error);
            if (error instanceof TaskNotFoundError) {
                return badRequest({ message: error.message });
            }
            return serverError();
        }
    }
}
