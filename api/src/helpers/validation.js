import { badRequest } from './http.js';

export const checkIfIdIsValid = (id) => {
    return typeof id === 'number';
};

export const invalidIdResponse = () => {
    return badRequest({ message: 'Id is invalid.' });
};
