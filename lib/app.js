const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');

app.use(express.json());

app.use(notFound);
app.use(handler);
module.exports = app;
