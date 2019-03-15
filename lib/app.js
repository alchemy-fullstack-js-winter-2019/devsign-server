const express = require('express');
const app = express();
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const tweets = require('./routes/tweets');

app.use(express.json());

// app.use('/', connection, require('./routes/post'));
app.use('/tweets', connection, tweets);


app.use(handler);

module.exports = app;
