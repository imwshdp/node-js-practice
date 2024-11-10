import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routes/user.routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', router);
app.use(errorMiddleware);

export default app;
