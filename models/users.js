const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const WrongPassword = require('../errors/WrongPassword');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        if (!validator.isEmail(value)) {
          throw new WrongPassword('Поле должно содержать корректный Email');
        }
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

function findByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new WrongPassword('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new WrongPassword('Неправильные почта или пароль');
          }
          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findByCredentials;

module.exports = mongoose.model('user', userSchema);
