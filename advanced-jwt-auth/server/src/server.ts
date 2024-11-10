import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import app from './app';

const PORT = process.env.PORT ?? 5000;
const DB_URL = process.env.MONGODB_CONNECTION_URL;

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
