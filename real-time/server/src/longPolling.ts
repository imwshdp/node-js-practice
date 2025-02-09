import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import events from 'events';

const emitter = new events.EventEmitter();

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/get-messages', (request: Request<{}, {}, {}>, response: Response, next: NextFunction) => {
	emitter.once('newMessage', (message) => {
		response.json(message);
	});
});

app.post(
	'/new-message',
	(
		request: Request<
			{},
			{},
			{
				id: number;
				message: string;
			}
		>,
		response: Response,
		next: NextFunction,
	) => {
		const message = request.body;
		emitter.emit('newMessage', message);
		response.status(200);
	},
);

const start = async () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (error) {
		console.error(error);
	}
};

start();
