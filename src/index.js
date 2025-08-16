import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import './config/db.js';

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(4000, () => console.log('Servidor en puerto 4000'));