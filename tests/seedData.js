// const Tweet = require('../lib/models/Tweet');
const Message = require('../lib/models/Message');
const chance = require('chance').Chance();

// function seedData(count = 100) {
//   const tweetsToCreate = [...Array(count)].map(() => ({
//     user: 'auth0|5c8999089c0ac45b5d211df3',
//     text: chance.sentence()
//   }));

//   return Tweet.create(tweetsToCreate);
// }

function seedData(count = 100) {
  const messagesToCreate = [...Array(count)].map(() => ({
    sender: 'auth0|5c8999089c0ac45b5d211df3',
    receiver:'auth0|5c898663f1c10c625d363f47',
    text: chance.sentence()
  }));

  return Message.create(messagesToCreate);
}

module.exports = seedData;
