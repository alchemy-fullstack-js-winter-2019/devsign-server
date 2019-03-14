const Tweet = require('../lib/models/Tweet');
const chance = require('chance').Chance();

function seedData() {
  const tweetsToCreate = [...Array(100)].map(() => ({
    user: 'auth0|5c00b0cde9f0262e937842c9',
    text: chance.sentence()
  }));

  return Tweet.create(tweetsToCreate);
}

module.exports = seedData;
