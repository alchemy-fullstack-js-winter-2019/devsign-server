const seedData = require('./tests/seedData');


seedData()
  .then(() => console.log('done'))
  .catch(err => console.error(err));
