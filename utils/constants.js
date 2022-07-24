const {
  PORT = 3000,
  NODE_ENV,
  JWT_SALT,
  MONGOOSE_URL,
} = process.env;

const MONGO_DEV = 'mongodb://localhost:27017/moviesdb';

module.exports = {
  MONGOOSE_URL, PORT, NODE_ENV, JWT_SALT, MONGO_DEV,
};
