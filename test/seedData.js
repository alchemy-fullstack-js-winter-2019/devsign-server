const Hum = require('../lib/models/Hum');
const chance = require('chance').Chance();

module.exports = () => {
  return Promise.all([...Array(100)].map(() => {
    return Hum.create({
      user: 'google-oauth2|111881030566819642014',
      hum: chance.sentence()
    });
  })
  );
};
