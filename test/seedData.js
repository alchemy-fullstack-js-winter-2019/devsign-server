const Hum = require('../lib/models/Hum');
const chance = require('chance').Chance();

module.exports = () => {
  return Promise.all([...Array(100)].map(() => {
    return Hum.create({
      user: chance.name(),
      hum: chance.sentence()
    });
  })
  );
};
