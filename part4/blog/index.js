const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoute = require('./routes/blog');
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const config = require('./utils/config');
const errMiddleware = require('./middlewares/error');
const logger = require('./utils/logger');
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('Connected to mongodb server with uri:', config.MONGODB_URI);
  })
  .catch(() => {
    logger.error('connected to db error');
  });
app.use(cors());
app.use(express.json());

app.use(errMiddleware.requestLogger);
app.use('/api', blogRoute, userRoute, loginRoute);

app.use(errMiddleware.unknownEndpoint);
app.use(errMiddleware.errorHandler);

if (config.ENV !== 'test') {
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
}

module.exports = app;
