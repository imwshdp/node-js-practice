import { FC, useRef, useState } from 'react';
import { ROUTES } from '../../model/routes';
import { WsEvents, WsMessageType } from '../../model/types';
import Form from '../Form';

const WebSockets: FC = () => {
	const [messages, setMessages] = useState<WsMessageType[]>([]);
	const [value, setValue] = useState<string>('');

	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [username, setUsername] = useState<string>('');

	const ws = useRef<WebSocket | null>(null);

	const connect = () => {
		ws.current = new WebSocket(ROUTES.webSockets.connection);
		ws.current.onopen = () => {
			const connectMessage = {
				event: WsEvents.connection,
				id: Date.now(),
				date: new Date().toString(),
				username,
			};
			ws.current?.send(JSON.stringify(connectMessage));

			setIsConnected(true);
			console.log('Connection is open');
		};

		ws.current.onmessage = (event) => {
			const message = JSON.parse(event.data);
			setMessages((prevMessages) => [message, ...prevMessages]);
		};

		ws.current.onclose = () => {
			setIsConnected(false);
			console.log('Connection is closed');
		};
		ws.current.onerror = () => {
			console.error('Connection is interrupted');
		};
	};

	const sendMessages = async () => {
		const message: WsMessageType = {
			event: WsEvents.message,
			id: Date.now(),
			date: Date.now().toString(),
			username,
			message: value,
		};

		ws.current?.send(JSON.stringify(message));
		setValue('');
	};

	if (!isConnected) {
		return (
			<>
				<div className='form'>
					<input
						type='text'
						placeholder='Enter your name'
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
					<button onClick={connect}>Login</button>
				</div>
			</>
		);
	}

	return (
		<>
			<Form message={value} onChangeMessage={(newMessage: string) => setValue(newMessage)} sendMessage={sendMessages} />

			<div className='messages'>
				{messages.map((message, index: number) => {
					return message.event === WsEvents.connection ? (
						<span className='connection_message'>{message.username} is connected</span>
					) : (
						<div key={index} className='message'>
							{message.username}: {message.message}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default WebSockets;
