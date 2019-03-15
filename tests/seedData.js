const Tweet = require('../lib/models/Tweet');
const chance = require('chance').Chance();

function seedData() {
  const tweetsToCreate = [...Array(10)].map({
    handle: chance.name(),
    text: chance.sentence()
  });

  return Tweet.create(tweetsToCreate);
}

module.exports = seedData;
