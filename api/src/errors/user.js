export class EmailAlreadyInuseError extends Error {
    constructor(email) {
        super(`The provided email ${email} is already in use.`);
        this.name = 'EmailAlreadyInuseError';
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User with id ${userId} not found.`);
        this.name = 'UserNotFoundError';
    }
}

export class InvalidPasswordError extends Error {
    constructor() {
        super('Password invalid.');
        this.name = 'InvalidPasswordError';
    }
}
