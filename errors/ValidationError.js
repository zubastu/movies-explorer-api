class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongPassword';
    this.status = 400;
  }
}

module.exports = ValidationError;
