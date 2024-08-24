const http = require('http');

const PORT = process.env.PORT ?? 3000;

const server = http.createServer((request, response) => {
	response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

	if (request.url === '/users') {
		return response.end(
			JSON.stringify({
				id: 1,
				name: 'John',
			}),
		);
	}

	if (request.url === '/posts') {
		return response.end('POSTS');
	}
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

