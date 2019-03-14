const Tweet = require('../lib/models/Tweet');
const chance = require('chance');

function seedData(count = 100) {
  const tweetsToCreate = [...Array(count)].map(() => ({
    user: chance.name(),
    text: chance.sentence()
  }));

  return Tweet.create(tweetsToCreate);
}
module.exports = seedData;
