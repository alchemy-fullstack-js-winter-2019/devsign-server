const express = require('express');
const app = express();

const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');

app.use(require('./middleware/cors'));
app.use('/posts', connection, require('./routes/posts'));

app.use(handler);

module.exports = app;
  
