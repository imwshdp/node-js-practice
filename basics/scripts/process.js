const dotenv = require('dotenv');
dotenv.config();

console.log('process.id', process.pid); // process id
console.log('process.env.PORT', process.env.PORT); // port
console.log('process.env.NODE_ENV', process.env.NODE_ENV); // port

console.log('process.argv', process.argv);

while (true) {
	const random = Math.random();
	if (random > 0.5) {
		console.log('process.exit');
		process.exit();
	}
}

