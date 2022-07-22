const router = require('express').Router();
const { getUser, patchUser } = require('../controllers/users');
const { patchUserValidation } = require('../validation/validation');

router.get('/me', getUser);
router.patch('/me', patchUserValidation, patchUser);

module.exports = router;
