const os = require('os');
const cluster = require('cluster');

// console.log('os.platform: ', os.platform());
// console.log('os.arch: ', os.arch());
// console.log('os.cpus length: ', os.cpus().length);

const cpus = os.cpus();

if (cluster.isMaster) {
	for (let i = 0; i < cpus.length - 2; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		console.log(`worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	console.log(`worker ${process.pid} running`);

	// logging workers
	setInterval(() => {
		console.log(`worker ${process.pid} still running`);
	}, 5000);
}

