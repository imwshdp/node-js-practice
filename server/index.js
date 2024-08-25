const dotenv = require('dotenv');
const mongoose = require('mongoose');

const App = require('./app');
const userRouter = require('./router/userRouter');
const jsonParser = require('./middleware/parseJson');
const urlParser = require('./middleware/parseUrl');

dotenv.config();

const PORT = process.env.PORT ?? 3000;

const app = new App();

app.use(urlParser('http://localhost:3000'));
app.use(jsonParser);
app.addRouter(userRouter);

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

