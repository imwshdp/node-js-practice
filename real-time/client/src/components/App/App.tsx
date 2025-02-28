import { ChangeEventHandler, useState } from 'react';
import EventSourcing from '../EventSourcing';
import LongPolling from '../LongPolling';
import WebSockets from '../WebSockets';

import './App.css';

function App() {
	const [method, setMethod] = useState('WebSockets');

	const renderComponent = () => {
		switch (method) {
			case 'WebSockets':
				return <WebSockets />;
			case 'LongPolling':
				return <LongPolling />;
			case 'EventSourcing':
				return <EventSourcing />;
			default:
				return <WebSockets />;
		}
	};

	const methodHandler: ChangeEventHandler<HTMLSelectElement> = (e) => setMethod(e.target.value);

	return (
		<main className='wrapper'>
			<div className='center'>
				<select onChange={methodHandler} value={method}>
					<option value='LongPolling'>Long Polling</option>
					<option value='EventSourcing'>Event Sourcing</option>
					<option value='WebSockets'>WebSockets</option>
				</select>
				{renderComponent()}
			</div>
		</main>
	);
}

export default App;
