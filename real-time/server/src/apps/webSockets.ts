import { Server } from 'ws';

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

const createWsServer = (PORT: number) => {
	const webSocketServer = new Server(
		{
			port: PORT,
		},
		() => {
			console.log(`WebSockets server started on port ${PORT}`);
		},
	);

	const broadcastMessage = (message: MessageType) => {
		webSocketServer.clients.forEach((client) => {
			if (client.readyState === client.OPEN) {
				client.send(JSON.stringify(message));
			}
		});
	};

	webSocketServer.on('connection', (ws) => {
		ws.on('message', (message) => {
			try {
				const newMessage: MessageType = JSON.parse(message.toString());

				switch (newMessage.event) {
					case WsEvents.message:
					case WsEvents.connection:
						broadcastMessage(newMessage);
						break;
				}
			} catch (error) {
				console.error('Error parsing message:', error);
			}
		});

		ws.on('close', () => {
			console.log('Client disconnected');
		});
	});
};

const serve = {
	listen: (PORT: number, logCallback: Function) => {
		createWsServer(PORT);
		logCallback();
	},
};

export default serve;
