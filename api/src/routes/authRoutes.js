import express from 'express';
import { blackListTokens } from '../../prisma/blacklist.js';
import { generateUserController } from '../factories/user.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const userController = generateUserController();
    const { statusCode, body } = await userController.login(req);
    res.status(statusCode).send(body);
});

router.post('/logout', (req, res) => {
    const token = req.headers['authorization'];
    blackListTokens.add(token);
    res.end();
});

export default router;
