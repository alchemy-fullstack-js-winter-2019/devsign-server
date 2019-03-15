require('dotenv').config();
require('./lib/utils/connect')();
const mongoose = require('mongoose');
const seedData = require('./tests/seedData');

seedData(100)
    .then(() => console.log('done loading data'))
    .catch(err => console.error(err))
    .finally(() => mongoose.connection.close());
