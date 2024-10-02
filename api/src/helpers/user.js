import { badRequest } from './http.js';

export const userNotFoundResponse = () => {
    return badRequest({ message: 'User not found.' });
};
