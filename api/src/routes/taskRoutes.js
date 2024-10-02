import express from 'express';
import {
    generateTaskController,
    generateTaskControllerWithUser,
} from '../factories/user.js';
import { authenticateToken } from '../midlewares/auth-token.js';

const router = express.Router();

router.get('/tasks', authenticateToken, async (req, res) => {
    const taskController = generateTaskControllerWithUser();
    const { statusCode, body } = await taskController.getAll(req);
    res.status(statusCode).send(body);
});

router.get('/tasks/:taskId', authenticateToken, async (req, res) => {
    const taskController = generateTaskController();
    const { statusCode, body } = await taskController.getById(req);
    res.status(statusCode).send(body);
});

router.post('/tasks', authenticateToken, async (req, res) => {
    const taskController = generateTaskControllerWithUser();
    const { statusCode, body } = await taskController.create(req);
    res.status(statusCode).send(body);
});

router.put('/tasks/:taskId', authenticateToken, async (req, res) => {
    const taskController = generateTaskControllerWithUser();
    const { statusCode, body } = await taskController.update(req);
    res.status(statusCode).send(body);
});

router.delete('/tasks/:taskId', authenticateToken, async (req, res) => {
    const taskController = generateTaskController();
    const { statusCode, body } = await taskController.delete(req);
    res.status(statusCode).send(body);
});

export default router;
