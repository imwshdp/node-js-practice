import express from 'express';
import cors from 'cors';

import { Server } from 'ws';

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

enum WsEvents {
	message = 'message',
	connection = 'connection',
}

type MessageType = {
	event: WsEvents;
	id: number;
	date: string;
	username: string;
	message: string;
};

const webSocket = new Server(
	{
		port: PORT,
	},
	() => {
		console.log(`Server started on port ${PORT}`);
	},
);

const broadcastMessage = (message: MessageType) => {
	webSocket.clients.forEach((client) => {
		client.send(JSON.stringify(message));
	});
};

webSocket.on('connection', (ws) => {
	ws.on('message', (message) => {
		const newMessage: MessageType = JSON.parse(message.toString());

		switch (newMessage.event) {
			case WsEvents.message:
				broadcastMessage(newMessage);
				break;
			case WsEvents.connection:
				broadcastMessage(newMessage);
				break;
		}
	});
});
