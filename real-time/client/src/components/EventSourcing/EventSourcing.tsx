import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { CommonMessage } from '../../model/types';
import { ROUTES } from '../../model/routes';
import Form from '../Form';
import MessagesBox from '../MessagesBox';

const EventSourcing: FC = () => {
	const [messages, setMessages] = useState<CommonMessage[]>([]);
	const [value, setValue] = useState<string>('');

	const sendMessages = async () => {
		await axios.post<CommonMessage>(ROUTES.eventSourcing.post, { message: value, id: Date.now() });
	};

	useEffect(() => {
		const eventSource = new EventSource(ROUTES.eventSourcing.get);

		eventSource.onmessage = function (event) {
			const newMessage = JSON.parse(event.data);
			setMessages((prevMessages) => [newMessage, ...prevMessages]);
		};

		return () => {
			eventSource.close();
		};
	}, []);

	return (
		<>
			<Form message={value} onChangeMessage={(newMessage: string) => setValue(newMessage)} sendMessage={sendMessages} />

			<MessagesBox messages={messages} />
		</>
	);
};

export default EventSourcing;
