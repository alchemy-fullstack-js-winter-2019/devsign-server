const Tweet = require('../lib/models/Tweet');
const chance = require('chance').Chance();

function seedData() {
  console.log(Tweet);
  const tweetsToCreate = [...Array(10)].map(() => ({
    user: chance.name(),
    text: chance.sentence()
  }));

  return Tweet.create(tweetsToCreate);
}

module.exports = seedData;
