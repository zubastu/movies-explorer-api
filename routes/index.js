const router = require('express').Router();
const { register, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { loginValidation, registrationValidation } = require('../validation/validation');

router.post('/signin', registrationValidation, register);
router.post('/signup', loginValidation, login);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
