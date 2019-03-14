const express = require('express');
const app = express();

const connection = require('../lib/middleware/connection');
const { handler } = require('./middleware/error');

app.use(require('morgan')('dev'));
app.use(express.json());

app.use(handler);

module.exports = app;
