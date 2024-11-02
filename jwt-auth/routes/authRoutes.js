const Router = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/authController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = new Router();

router.post(
	'/registration',
	[
		check('username', 'Username cannot be empty').notEmpty(),
		check('password', 'Password must be at least 4 characters').isLength({ min: 4, max: 32 }),
	],
	authController.registration,
);
router.post('/login', authController.login);
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers);

module.exports = router;

