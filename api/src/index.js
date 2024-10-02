import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());

app.use(cors());
app.use(userRoutes);
app.use(taskRoutes);
app.use(authRoutes);

app.listen(3000, () => console.log('Server is running'));
