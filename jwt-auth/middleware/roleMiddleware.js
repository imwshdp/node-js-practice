const jwt = require('jsonwebtoken');

module.exports = function (roles) {
	return (request, response, next) => {
		if (request.method === 'OPTIONS') {
			next();
		}

		try {
			const token = request.headers.authorization.split(' ')[1];
			if (!token) {
				return response.status(401).json({ message: 'Unauthorized' });
			}

			const { roles: userRoles } = jwt.verify(token, process.env.SECRET_KEY);

			let hasRole = false;
			userRoles.forEach((role) => {
				if (roles.includes(role)) {
					hasRole = true;
				}
			});

			if (!hasRole) {
				return response.status(403).json({ message: 'Forbidden' });
			}

			next();
		} catch (error) {
			console.error(error);
			return response.status(401).json({ message: 'Unauthorized' });
		}
	};
};

