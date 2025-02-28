import cors from 'cors';
import events from 'events';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import { ErrorEnum, Events, EventSourcingPaths } from '../types/apps.types';
import { MessageBody } from '../types/messages.types';

const emitter = new events.EventEmitter();

const app = express();
app.use(cors());
app.use(express.json());

app.get(`/${EventSourcingPaths.connect}`, (request: Request, response: Response, next: NextFunction) => {
	response.writeHead(200, {
		// prettier-ignore
		'Connection': 'keep-alive',
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
	});

	const onNewMessageHandler = (message: MessageBody) => {
		response.write(`data: ${JSON.stringify(message)}\n\n`);
	};

	emitter.on(Events.NEW_MESSAGE, onNewMessageHandler);

	const cleanup = () => {
		emitter.off(Events.NEW_MESSAGE, onNewMessageHandler);
		response.end();
	};

	request.on('close', cleanup);
	request.on('error', cleanup);
});

app.post(
	`/${EventSourcingPaths.new}`,
	(request: Request<{}, {}, MessageBody>, response: Response, next: NextFunction) => {
		const message = request.body;

		if (!message.id || !message.message) {
			response.status(400).json({ error: ErrorEnum.INVALID_MESSAGE });
		}

		emitter.emit(Events.NEW_MESSAGE, message);
		response.status(200).end();
	},
);

export default app;
