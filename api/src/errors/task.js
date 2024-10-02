export class TaskAlreadyExistsError extends Error {
    constructor(title) {
        super(`This task ${title} already exists.`);
        this.name = TaskAlreadyExistsError;
    }
}

export class TaskNotFoundError extends Error {
    constructor(taskId) {
        super(`Task with id ${taskId} not found.`);
        this.name = TaskNotFoundError;
    }
}
