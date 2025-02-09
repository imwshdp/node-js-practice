export const ROUTES = {
	longPolling: {
		post: 'http://localhost:5000/new-message',
		get: 'http://localhost:5000/get-messages',
	},

	eventSourcing: {
		post: 'http://localhost:5000/new-message',
		get: 'http://localhost:5000/connect-messages',
	},

	webSockets: {
		connection: 'ws://localhost:5000/connection',
	},
};
