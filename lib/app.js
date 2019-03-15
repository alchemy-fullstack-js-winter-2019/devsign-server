const express = require('express');
const app = express();
const { handler } = require('./middleware/error');
const tweets = require('./routes/tweets');
const connection = require('./middleware/connection');

app.use(express.json());
app.use('/tweets', connection, tweets);

app.use(handler);
module.exports = app;
