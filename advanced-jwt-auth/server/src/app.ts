import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routes/user.routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL
	})
);

app.use('/api', router);
app.use(errorMiddleware);

export default app;
