const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const Role = require('../models/Role');

const { generateAccessToken } = require('../lib/jwt');

class authController {
	async registration(request, response) {
		try {
			const errors = validationResult(request);

			if (!errors.isEmpty()) {
				return response.status(400).json({ message: 'Registration error', errors });
			}

			const { username, password } = request.body;

			const candidate = await User.findOne({ username });
			if (candidate) {
				return response.status(400).json({ message: 'User already exists' });
			}

			const hashPassword = bcrypt.hashSync(password, 7);
			const userRole = await Role.findOne({ value: 'USER' });

			const user = new User({ username, password: hashPassword, roles: [userRole.value] });
			await user.save();

			return response.status(200).json({ message: 'Registration is successful' });
		} catch (error) {
			console.error(error);
			return response.status(400).json({ message: 'Registration error' });
		}
	}

	async login(request, response) {
		try {
			const { username, password } = request.body;

			const user = await User.findOne({ username });
			if (!user) {
				return response.status(400).json({ message: 'User not found' });
			}

			const isPasswordValid = bcrypt.compareSync(password, user.password);
			if (!isPasswordValid) {
				return response.status(400).json({ message: 'Wrong password' });
			}

			const token = generateAccessToken({
				id: user._id,
				roles: user.roles,
			});

			return response.json({ token });
		} catch (error) {
			console.error(error);
			return response.status(400).json({ message: 'Login error' });
		}
	}

	async getUsers(request, response) {
		try {
			const users = await User.find();
			return response.json({ users });
		} catch (error) {
			console.error(error);
			return response.status(500).json({ message: 'Fetching data error' });
		}
	}
}

module.exports = new authController();

