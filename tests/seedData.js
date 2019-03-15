const Tweet = require('../lib/models/Tweet');
const Message = require('../lib/models/Message');
const chance = require('chance').Chance();

function seedData(count = 100) {
  const tweetsToCreate = [...Array(count)].map(() => ({
    user: 'auth0|5c8999089c0ac45b5d211df3',
    text: chance.sentence()
  }));

  return Tweet.create(tweetsToCreate);
}

function seedDataMessage(count = 100) {
  const messagesToCreate = [...Array(count)].map(() => ({
    user: 'auth0|5c8999089c0ac45b5d211df3',
    text: chance.sentence()
  }));

  return Message.create(messagesToCreate);
}

module.exports = {
  seedData,
  seedDataMessage
};

