const jwt = require('jsonwebtoken');

const generateAccessToken = ({ id, roles }) => {
	const payload = {
		id,
		roles,
	};

	return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
};

module.exports = {
	generateAccessToken,
};
