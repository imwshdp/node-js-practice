import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { ROUTES } from '../../model/routes';
import { CommonMessage } from '../../model/types';
import Form from '../Form';
import MessagesBox from '../MessagesBox';

const LongPolling: FC = () => {
	const [messages, setMessages] = useState<CommonMessage[]>([]);
	const [value, setValue] = useState<string>('');

	const sendMessages = async () => {
		await axios.post<CommonMessage>(ROUTES.longPolling.post, { message: value, id: Date.now() });
	};

	const subscribeToMessages = async () => {
		try {
			const { data } = await axios.get<CommonMessage>(ROUTES.longPolling.get);
			setMessages((prevMessages) => [data, ...prevMessages]);
			await subscribeToMessages();
		} catch (error) {
			console.error(error);
			setTimeout(() => subscribeToMessages(), 1000);
		}
	};

	useEffect(() => {
		subscribeToMessages();
	}, []);

	return (
		<>
			<Form message={value} onChangeMessage={(newMessage: string) => setValue(newMessage)} sendMessage={sendMessages} />

			<MessagesBox messages={messages} />
		</>
	);
};

export default LongPolling;
