class WrongOwner extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongOwner';
    this.status = 403;
  }
}

module.exports = WrongOwner;
