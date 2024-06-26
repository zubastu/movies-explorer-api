require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { errorProcessing } = require("./middlewares/errors");
const {
  MONGOOSE_URL,
  PORT,
  MONGO_DEV,
  NODE_ENV,
} = require("./utils/constants");

const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("cors");
const limiter = require("./middlewares/limiter");
const routes = require("./routes/index");

const app = express();

mongoose.connect(NODE_ENV === "production" ? MONGOOSE_URL : MONGO_DEV, {
  useNewUrlParser: true,
  family: 4,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => next(errorProcessing(err, res, req)));

app.listen(PORT, () => {
  console.log(`App started on ${PORT} port`);
});
