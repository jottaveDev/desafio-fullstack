import jwt from 'jsonwebtoken';
import { blackListTokens } from '../../prisma/blacklist.js';

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    const hasTokenBlacklist = blackListTokens.has(token);
    if (hasTokenBlacklist) {
        return res.status(403).send({ message: 'Token expired.' });
    }
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Token expired.' });
        }
        req.userId = decoded.id;
        next();
    });
};
