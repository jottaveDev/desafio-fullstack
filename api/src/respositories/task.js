import { prisma } from '../../prisma/prisma.js';

export class TaskRepository {
    async getAll(userId) {
        return await prisma.task.findMany({
            where: {
                user_id: userId,
            },
        });
    }

    async getById(taskId) {
        return await prisma.task.findUnique({
            where: {
                id: taskId,
            },
        });
    }

    async getByTitle(taskTitle) {
        return await prisma.task.findFirst({
            where: {
                title: taskTitle,
            },
        });
    }

    async create(taskParams) {
        return await prisma.task.create({
            data: taskParams,
        });
    }

    async update(taskId, taskParams) {
        return await prisma.task.update({
            where: {
                id: taskId,
            },
            data: taskParams,
        });
    }

    async delete(taskId) {
        return await prisma.task.delete({
            where: {
                id: taskId,
            },
        });
    }
}
