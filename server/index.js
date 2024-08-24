const PORT = process.env.PORT ?? 3000;

const App = require('./app');
const Router = require('./router');

const app = new App();
const router = new Router();

router.get('/users', (req, res) => {
	res.end('USERS REQUEST SENDED');
});

router.get('/posts', (req, res) => {
	res.end('POSTS REQUEST SENDED');
});

app.addRouter(router);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

