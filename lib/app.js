const express = require('express');
const app = express();

const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');

app.use('/quibs', connection, require('../routes/quibs'));

app.use(handler);

module.exports = app;
