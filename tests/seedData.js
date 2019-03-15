const Tweet = require('../lib/models/Tweet');
const chance = require('chance').Chance();

function seedData(count = 100) {
  const tweetsToCreate = [...Array(count)].map(() => ({
    user: 'auth0|5c8999089c0ac45b5d211df3',
    text: chance.sentence()
  }));

  return Tweet.create(tweetsToCreate);
}
module.exports = seedData;
