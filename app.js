require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { errorProcessing } = require('./errors/errors');
const { MONGOOSE_URL, PORT } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');

const app = express();

mongoose.connect(MONGOOSE_URL, { useNewUrlParser: true, family: 4 });

app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(routes);
app.use(errors());
app.use(errorLogger);
app.use(errorProcessing);

app.listen(PORT, () => {
  console.log(`App started on ${PORT} port`);
});
