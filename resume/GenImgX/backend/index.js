import express from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';

const app = express();
const port = 3000;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use('/', router);

app.listen(port, () => {});
