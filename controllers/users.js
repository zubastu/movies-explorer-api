const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { checkBadData } = require('../errors/errors');
const ValidationError = require('../errors/ValidationError');
const UsedEmail = require('../errors/UsedEmail');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => checkBadData(user, res))
    .catch((err) => next(err));
};

module.exports.patchUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    _id,
    { $set: { name, email } },
    { new: true, runValidators: true },
  )
    .then((user) => checkBadData(user, res))
    .catch((err) => next(err));
};

module.exports.register = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!email) {
        const err = new ValidationError('Email не может быть пустым');
        return next(err);
      }
      if (user) {
        const err = new UsedEmail('Пользователь с таким email уже есть!');
        return next(err);
      }
      return bcrypt.hash(password, 10).then((hash) => User.create({ name, email, password: hash }))
        .then((userInfo) => {
          const newUserInfo = { name: userInfo.name, _id: userInfo._id, email: userInfo.email };
          checkBadData(newUserInfo, res);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError('Email или пароль не могут быть пустыми');
  }

  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some',
        { expiresIn: '7d' },
      );
      const userLoginData = {
        name: user.name,
        email: user.email,
        _id: user._id,
        token,
      };
      return res.send(userLoginData);
    })
    .catch((err) => next(err));
};
