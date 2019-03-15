const Tweet = require('../lib/models/Tweet');
const chance = require('chance').Chance();

function seedData() {
  const tweetsToCreate = [...Array(100)].map(() => ({
    user: 'auth0|NEEDTOFILL',
    text: chance.sentence()
  }));

  return Tweet.create(tweetsToCreate);
}

module.exports = seedData;
