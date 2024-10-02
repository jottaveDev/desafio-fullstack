import { ZodError } from 'zod';
import {
    EmailAlreadyInuseError,
    InvalidPasswordError,
    UserNotFoundError,
} from '../errors/user.js';
import { badRequest, created, ok, serverError } from '../helpers/http.js';
import { userNotFoundResponse } from '../helpers/user.js';
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/validation.js';
import { createUserSchema, updateUserSchema } from '../schemas/user.js';

export class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async getById(httpRequest) {
        try {
            const userId = Number(httpRequest.params.userId);
            const idIsValid = checkIfIdIsValid(userId);
            if (!idIsValid) {
                return invalidIdResponse();
            }
            const user = await this.userService.getById(userId);
            if (!user) {
                return userNotFoundResponse();
            }
            return ok(user);
        } catch (error) {
            console.error(error);
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }
            return serverError();
        }
    }

    async create(httpRequest) {
        try {
            const userParams = httpRequest.body;
            await createUserSchema.parseAsync(userParams);
            const user = await this.userService.create(userParams);
            return created(user);
        } catch (error) {
            console.error(error);
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message });
            }
            if (error instanceof EmailAlreadyInuseError) {
                return badRequest({ message: 'Email already in use.' });
            }
            return serverError();
        }
    }

    async update(httpRequest) {
        try {
            const userId = Number(httpRequest.params.userId);
            const idIsValid = checkIfIdIsValid(userId);
            if (!idIsValid) {
                return invalidIdResponse();
            }
            const userParams = httpRequest.body;
            await updateUserSchema.parseAsync(userParams);
            const userUpdated = await this.userService.update(
                +userId,
                userParams,
            );
            return ok(userUpdated);
        } catch (error) {
            console.error(error);
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message });
            }
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }
            if (error instanceof EmailAlreadyInuseError) {
                return badRequest({ message: 'Email already in use.' });
            }
            return serverError();
        }
    }

    async delete(httpRequest) {
        try {
            const userId = Number(httpRequest.params.userId);
            const idIsValid = checkIfIdIsValid(userId);
            if (!idIsValid) {
                return invalidIdResponse();
            }
            const deletedUser = await this.userService.delete(+userId);
            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }
            return serverError();
        }
    }

    async login(httpRequest) {
        try {
            const userParams = httpRequest.body;
            const userLogin = await this.userService.login(userParams);
            return ok(userLogin);
        } catch (error) {
            console.error(error);
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }
            if (error instanceof InvalidPasswordError) {
                return badRequest({ message: 'Password invalid.' });
            }
            return serverError();
        }
    }
}
