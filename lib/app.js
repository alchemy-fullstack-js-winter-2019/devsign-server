const express = require('express');
const app = express();

const connection = require('../lib/middleware/connection');
const { handler } = require('./middleware/error');

app.use('/tweets', connection, require('./routes/tweets'));
app.use('/users', connection, require('./routes/users'));

app.use(handler);

module.exports = app;
