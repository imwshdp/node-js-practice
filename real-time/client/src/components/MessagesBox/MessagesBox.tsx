import { FC } from 'react';
import { CommonMessage } from '../../model/types';

interface PropsType {
	messages: CommonMessage[];
}

const MessagesBox: FC<PropsType> = ({ messages }) => {
	return (
		<div className='messages'>
			{messages.map((message, index: number) => (
				<div key={index} className='message'>
					{message.message}
				</div>
			))}
		</div>
	);
};

export default MessagesBox;
