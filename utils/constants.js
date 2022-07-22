const {
  PORT = 3000, NODE_ENV, JWT_SALT, MONGOOSE_URL,
} = process.env;

module.exports = {
  MONGOOSE_URL, PORT, NODE_ENV, JWT_SALT,
};
