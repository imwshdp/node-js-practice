import { ChangeEventHandler, FC } from 'react';

interface PropsType {
	message: string;
	onChangeMessage: (message: string) => void;
	sendMessage: () => void;
}

const Form: FC<PropsType> = ({ message, onChangeMessage, sendMessage }) => {
	const handleChangeMessage: ChangeEventHandler<HTMLInputElement> = (event) => onChangeMessage(event.target.value);

	return (
		<div className='form'>
			<input type='text' className='text' value={message} onChange={handleChangeMessage} />
			<button onClick={sendMessage}>Send</button>
		</div>
	);
};

export default Form;
