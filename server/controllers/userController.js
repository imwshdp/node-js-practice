const User = require('../models/userModel');

const getUsers = async (req, res) => {
	// if (req.params.id) {
	// 	const user = users.find((user) => user.id == req.params.id) ?? undefined;
	// 	return res.send(user);
	// }

	let users;

	if (req.params.id) {
		users = await User.findById(req.params.id);
	} else {
		users = await User.find();
	}

	await res.send(users);
};

const createUser = async (req, res) => {
	// const user = req.body;
	// users.push(user);

	const user = await User.create(req.body);
	res.send(user);
};

module.exports = {
	getUsers,
	createUser,
};

