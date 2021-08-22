require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
global.persons = require('./persons');
const personRouter = require('./routes/person');
const personModel = require('./mongo');
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('build'));
app.use(
  morgan(function (tokens, req, res) {
    const logs = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ];
    if (tokens.method(req, res) === 'POST') {
      logs.push(JSON.stringify(req.body));
    }
    return logs.join(' ');
  }),
);

app.use('/api', personRouter);
app.get('/info', async (req, res) => {
  const countPersons = await personModel.countDocuments();
  res.send(
    `<p>Phonebook has info for ${countPersons} people</p>${new Date()} <p></p>`,
  );
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);
const errorHandler = (error, request, response, next) => {
  console.log('object');

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
