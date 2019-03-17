const express = require('express');
const app = express();
const { handler } = require('./middleware/error');
const connection = require('./middleware/connection');
const tweets = require('./routes/tweets');
const messages = require('./routes/messages');

app.use(require('../lib/middleware/cors'));
app.use(express.json());
app.use('/tweets', connection, tweets);
app.use('/messages', connection, messages);

app.use(handler);
module.exports = app;
