const Tweet = require('../lib/models/Tweet');
const chance = require('chance').Chance();

function seedData(count = 100) {
  const tweetsToCreate = [...Array(count)].map(() => ({
    user: 'auth0|5c8ecce05bf4e02eaf766188',
    text: chance.sentence()
  }));
  return Tweet.create(tweetsToCreate);
}

module.exports = seedData;
