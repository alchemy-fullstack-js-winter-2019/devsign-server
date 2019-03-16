const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const connection = require('../lib/middleware/connection');
const { handler } = require('./middleware/error');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/tweets', connection, require('./routes/tweets'));
app.use('/users', connection, require('./routes/users'));

app.use(handler);

module.exports = app;
