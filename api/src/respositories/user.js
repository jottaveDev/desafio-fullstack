import { prisma } from '../../prisma/prisma.js';

export class UserRepository {
    async getById(id) {
        return await prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async getByEmail(email) {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async create(userParams) {
        return await prisma.user.create({
            data: {
                email: userParams.email,
                password: userParams.password,
            },
        });
    }

    async update(userId, userParams) {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: userParams,
        });
    }

    async delete(userId) {
        return await prisma.user.delete({
            where: {
                id: userId,
            },
        });
    }
}
