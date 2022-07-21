const router = require('express').Router();
const { register, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', register);
router.post('/signup', login);
router.use(auth);
router.use('/users', require('./users'));
/* app.use('/movies', require('./movies')); */
module.exports = router;
