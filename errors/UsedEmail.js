class UsedEmail extends Error {
  constructor(message) {
    super(message);
    this.name = 'UsedEmail';
    this.status = 409;
  }
}

module.exports = UsedEmail;
