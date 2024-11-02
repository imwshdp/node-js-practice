const jwt = require('jsonwebtoken');

module.exports = function (request, response, next) {
	if (request.method === 'OPTIONS') {
		next();
	}

	try {
		const token = request.headers.authorization.split(' ')[1];
		if (!token) {
			return response.status(401).json({ message: 'Unauthorized' });
		}

		const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
		request.user = decodedToken;

		next();
	} catch (error) {
		console.error(error);
		return response.status(401).json({ message: 'Unauthorized' });
	}
};

