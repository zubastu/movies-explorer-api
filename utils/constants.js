const {
  PORT = 3000, NODE_ENV, JWT_SALT, MONGOOSE_URL = 'mongodb://localhost:27017',
} = process.env;

module.exports = {
  MONGOOSE_URL, PORT, NODE_ENV, JWT_SALT,
};
