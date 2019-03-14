const Chance = require('chance');
const chance = new Chance();
const User = require('../lib/models/User');

const DEFAULT_TOTAL_USERS = 15;

module.exports = (
  totalUsers = DEFAULT_TOTAL_USERS
) => {
  return Promise.all(
    [...Array(totalUsers)].map(() => {
      return User.create({
        username: chance.email(),
        password: 'passittodaword'
      });
    })
  );
};
