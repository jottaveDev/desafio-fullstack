import express from 'express';
import { generateUserController } from '../factories/user.js';

const router = express.Router();

router.get('/users/:userId', async (req, res) => {
    const userController = generateUserController();
    const { statusCode, body } = await userController.getById(req);
    res.status(statusCode).send(body);
});

router.post('/users', async (req, res) => {
    const userController = generateUserController();
    const { statusCode, body } = await userController.create(req);
    res.status(statusCode).send(body);
});

router.put('/users/:userId', async (req, res) => {
    const userController = generateUserController();
    const { statusCode, body } = await userController.update(req);
    res.status(statusCode).send(body);
});

router.delete('/users/:userId', async (req, res) => {
    const userController = generateUserController();
    const { statusCode, body } = await userController.delete(req);
    res.status(statusCode).send(body);
});

export default router;
