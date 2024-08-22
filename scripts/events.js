const Emmiter = require('events');

const dotenv = require('dotenv');
dotenv.config();

const emmiter = new Emmiter();

emmiter.on('message', (data, second, third) => {
	console.log('data', data);
	console.log('second', second);
});

const message = process.env.MESSAGE ?? 'message from code';

if (message) {
	emmiter.emit('message', message, 'test', 'third');
} else {
	emmiter.emit('message was not provided');
}

