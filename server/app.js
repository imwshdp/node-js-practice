const http = require('http');
const EventEmitter = require('events');

module.exports = class Application {
	constructor() {
		this.server = this._createServer();
		this.emitter = new EventEmitter();
	}

	listen(port, callback) {
		this.server.listen(port, callback);
	}

	addRouter(router) {
		Object.keys(router.endpoints).forEach((path) => {
			const endpoint = router.endpoints[path];

			Object.keys(endpoint).forEach((method) => {
				this.emitter.on(this._getRouteMask(path, method), (request, response) => {
					const handler = endpoint[method];
					handler(request, response);
				});
			});
		});
	}

	_createServer() {
		return http.createServer((request, response) => {
			const emitted = this.emitter.emit(this._getRouteMask(request.url, request.method), request, response);

			if (!emitted) {
				response.end();
			}
		});
	}

	_getRouteMask(path, method) {
		return `[${path}]:[${method}]`;
	}
};

