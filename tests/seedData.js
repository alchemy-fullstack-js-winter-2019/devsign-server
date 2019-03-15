const Tweet = require('../lib/models/Tweet');
const chance = require('chance').Chance();

function seedData() {
  const tweetsToCreate = [...Array(1000)].map(() => ({
    user: chance.name(),
    text: chance.sentence()
  }));

  return Tweet.create(tweetsToCreate);
}

module.exports = seedData;
