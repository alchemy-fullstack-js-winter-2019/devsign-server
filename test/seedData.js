const Chance = require('chance');
const chance = new Chance();
const User = require('../lib/models/User');

const DEFAULT_TOTAL_USERS = 15;
// const DEFAULT_TOTAL_TWEETS = 30;

module.exports = (
  totalUsers = DEFAULT_TOTAL_USERS,
  // totalTweets = DEFAULT_TOTAL_TWEETS
) => {
  return Promise.all(
    [...Array(totalUsers)].map(() => {
      return User.create({
        username: chance.email(),
        password: 'passittodaword'
      });
    })
  );
  // .then(users => {
  //   return Promise.all(
  //     [...Array(totalTweets)].map(() => {
  //       return Tweet.create({
          
  //       });
  //     })
  //   );
  // });
};
