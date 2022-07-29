class AuthorizationRequired extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationRequired';
    this.status = 401;
  }
}
module.exports = AuthorizationRequired;
