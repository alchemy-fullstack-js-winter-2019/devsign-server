const express = require('express');
const app = express();
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const tweets = require('./routes/tweets');

app.use(require('./middleware/cors'));

app.use(express.json());

app.use('/tweets', connection, tweets);

app.use(handler);

module.exports = app;
