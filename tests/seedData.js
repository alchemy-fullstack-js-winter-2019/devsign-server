const Quib = require('../lib/models/Quib');
const chance = require('chance').Chance();

function seedData() {
  const quibsToCreate = [...Array(20)].map(() => ({
    user: 'auth0|5c8b1b5f2d542d2e4ee5ed74',
    text: chance.sentence()
  }));

  return Quib.create(quibsToCreate);
}

module.exports = seedData;
