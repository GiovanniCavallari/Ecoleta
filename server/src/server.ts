import path from 'path';
import cors from 'cors';
import express from 'express';
import { errors } from 'celebrate';
import { config } from 'dotenv';
import routes from './routes';

config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(process.env.SERVER_PORT);
