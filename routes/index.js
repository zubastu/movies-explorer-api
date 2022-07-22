const router = require('express').Router();
const { register, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { loginValidation, registrationValidation } = require('../validation/validation');
const { NOT_FOUND } = require('../middlewares/errors');

router.post('/signin', registrationValidation, register);
router.post('/signup', loginValidation, login);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res) => res.status(NOT_FOUND).send({ message: 'Не найдено' }));

module.exports = router;
