export enum WsEvents {
	message = 'message',
	connection = 'connection',
}

export type CommonMessage = {
	id: number;
	message: string;
};

export type WsMessageType = {
	event: WsEvents;
	id: number;
	date: string;
	username: string;
	message: string;
};

export type MessageType = CommonMessage | WsMessageType;
