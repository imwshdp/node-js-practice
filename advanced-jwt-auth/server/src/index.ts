import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routes';

dotenv.config();

const PORT = process.env.PORT ?? 5000;
const DB_URL = process.env.MONGODB_CONNECTION_URL;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', router);

const start = async () => {
	try {
		if (!DB_URL) {
			throw new Error('MongoDB connection url is not defined');
		}
		await mongoose.connect(DB_URL);

		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (error) {
		console.error(error);
	}
};

start();
