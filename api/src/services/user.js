import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    EmailAlreadyInuseError,
    InvalidPasswordError,
    UserNotFoundError,
} from '../errors/user.js';

export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getById(userId) {
        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw new UserNotFoundError();
        }
        return user;
    }

    async create(userParams) {
        const emailExists = await this.userRepository.getByEmail(
            userParams.email,
        );
        if (emailExists) {
            throw new EmailAlreadyInuseError(userParams.email);
        }
        const hashedPassword = await bcrypt.hash(userParams.password, 10);
        const user = {
            ...userParams,
            password: hashedPassword,
        };
        return await this.userRepository.create(user);
    }

    async update(userId, userParams) {
        const idExists = await this.userRepository.getById(userId);
        if (!idExists) {
            throw new UserNotFoundError();
        }
        if (userParams.email) {
            const emailExists = await this.userRepository.getByEmail(
                userParams.email,
            );
            if (emailExists && userId !== emailExists.id) {
                throw new EmailAlreadyInuseError(userParams.email);
            }
        }
        const user = { ...userParams };
        if (userParams.password) {
            const hashedPassword = await bcrypt.hash(userParams.password, 10);
            user.password = hashedPassword;
        }
        return this.userRepository.update(userId, user);
    }

    async delete(userId) {
        const idExists = await this.userRepository.getById(userId);
        if (!idExists) {
            throw new UserNotFoundError();
        }
        return this.userRepository.delete(userId);
    }

    async login(userParams) {
        const user = await this.userRepository.getByEmail(userParams.email);
        if (!user) {
            throw new UserNotFoundError();
        }
        const matchPassword = await bcrypt.compare(
            userParams.password,
            user.password,
        );
        if (!matchPassword) {
            throw new InvalidPasswordError();
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });
        return { token };
    }
}
