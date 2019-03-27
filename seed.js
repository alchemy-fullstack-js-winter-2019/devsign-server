require('dotenv').config();
require('./lib/utils/connect')();
const mongoose = require('mongoose');
const seedData = require('./tests/seedData');

seedData(10)
  .then(() => console.log('done'))
  .catch(err => console.error(err))
  .finally(() => mongoose.connection.close());

