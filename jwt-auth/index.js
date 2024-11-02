const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');

dotenv.config();

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(express.json());
app.use('/api', authRoutes);

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CONNECTION_URL);

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error(error);
	}
};

start();

