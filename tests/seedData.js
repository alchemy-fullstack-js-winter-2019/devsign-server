const Tweet = require('../lib/models/Tweet');
const chance = require('chance').Chance();

function seedData(count = 100) {
    const tweetsToCreate = [...Array(count)].map(() => ({
        user: 'google-oauth2|113221460541302189898',
        text: chance.sentence()
    }));

    return Tweet.create(tweetsToCreate);
}

module.exports = seedData;
