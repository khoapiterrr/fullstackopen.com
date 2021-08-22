const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoute = require('./routes/blog');
const config = require('./utils/config');
const errMiddleware = require('./middlewares/error');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
app.use(cors());
app.use(express.json());

app.use(errMiddleware.requestLogger);
app.use('/api', blogRoute);

app.use(errMiddleware.unknownEndpoint);
app.use(errMiddleware.errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
