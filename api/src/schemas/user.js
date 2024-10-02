import { z } from 'zod';

export const createUserSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required.',
        })
        .email({
            message: 'Please provide a valid e-mail.',
        })
        .trim()
        .min(1, {
            message: 'Email is required.',
        }),
    password: z
        .string({
            required_error: 'Password is required.',
        })
        .trim()
        .min(6, {
            message: 'Password must have at least 6 characters.',
        }),
});

export const updateUserSchema = createUserSchema.partial().strict({
    message: 'Some provided field is not allowed.',
});
