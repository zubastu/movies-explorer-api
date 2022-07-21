const MONGOOSE_URL = 'mongodb://localhost:27017/bitfilmsdb';
const { PORT = 3000, NODE_ENV, JWT_SALT } = process.env;

module.exports = {
  MONGOOSE_URL, PORT, NODE_ENV, JWT_SALT,
};
