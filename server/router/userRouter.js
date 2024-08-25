const Router = require('../router');

const { getUsers, createUser } = require('../controllers/userController');

const router = new Router();

router.get('/users', getUsers);
router.post('/users', createUser);

module.exports = router;

