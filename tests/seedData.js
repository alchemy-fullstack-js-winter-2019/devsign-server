const Tweet = require('../lib/models/Tweet');
const chance = require('chance').Chance();

function seedData() {
  const tweetsToCreate = [...Array(20)].map(() => ({
    user: 'auth0|5c8b1b5f2d542d2e4ee5ed74',
    text: chance.sentence()
  }));

  return Tweet.create(tweetsToCreate);
}

module.exports = seedData;
