export enum LongPollingPaths {
	connect = 'get-messages',
	new = 'new-message',
}

export enum EventSourcingPaths {
	connect = 'connect-messages',
	new = 'new-message',
}

export enum Events {
	NEW_MESSAGE = 'newMessage',
}

export enum ErrorEnum {
	INVALID_MESSAGE = 'Invalid message format',
}
