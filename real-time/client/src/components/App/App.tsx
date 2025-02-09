import './App.css';
import WebSockets from '../WebSockets';
// import LongPolling from '../LongPolling';
// import EventSourcing from '../EventSourcing';

function App() {
	return (
		<main className='wrapper'>
			<div className='center'>
				{/* <LongPolling /> */}
				{/* <EventSourcing /> */}
				<WebSockets />
			</div>
		</main>
	);
}

export default App;
