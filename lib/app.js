const express = require('express');
const app = express();
const connection = require('../lib/middleware/connection');
const { handler } = require('../lib/middleware/error.js');
const hums = require('../lib/routes/hums');

app.use(express.json());
app.use('/hums', connection, hums);
app.use(handler);

module.exports = app;
