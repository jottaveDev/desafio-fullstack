import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z
        .string({
            required_error: 'Title is required.',
        })
        .trim()
        .min(1, {
            message: 'Title is required.',
        }),
    status: z
        .boolean({
            message: 'Status invalid.',
        })
        .default(false),
});

export const updateTaskSchema = createTaskSchema.partial().strict({
    message: 'Some provided field is not allowed.',
});
