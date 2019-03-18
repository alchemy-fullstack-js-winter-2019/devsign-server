/* eslint-disable no-console*/
require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');

const PORT = proces.env.PORT || 7891;

app.listen(PORT, () => {
  console.log('running');
});

