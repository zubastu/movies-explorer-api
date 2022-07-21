const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
          throw new Error('Поле должно содержать корректный Email');
        }
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

function findByCredentials(email, password, next) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    })
    .catch((e) => next(e));
}

userSchema.statics.findUserByCredentials = findByCredentials;

module.exports = mongoose.model('user', userSchema);
