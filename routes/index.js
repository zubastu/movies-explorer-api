const router = require('express').Router();
const { register, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { loginValidation, registrationValidation } = require('../validation/validation');
const NotFound = require('../errors/NotFound');

router.post('/signup', registrationValidation, register);
router.post('/signin', loginValidation, login);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => next(new NotFound('Страница не найдена')));

module.exports = router;
