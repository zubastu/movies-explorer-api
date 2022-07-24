class WrongPassword extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongPassword';
    this.status = 401;
  }
}

module.exports = WrongPassword;
