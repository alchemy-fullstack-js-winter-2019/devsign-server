const Chance = require('chance');
const chance = new Chance();
const Chirp = require('../lib/models/Chirp');
const User = require('../lib/models/User');

module.exports = () => {
  return Promise.all(
    [...Array(10)].map(() => {
      const user = chance.pickone([
          {
            name: 'Jolee',
            handle: '@boleejolee',
            profileImage: 'https://joeschmoe.io/api/v1/jolee',
            bio: 'bio',
            location: 'Minneapolis, MN'
          },
        {
            name: 'Jed',
            handle: '@jedAndNed',
            profileImage: 'https://joeschmoe.io/api/v1/jed',
            bio: 'bio',
            location: 'Palm Beach, FL'
          },
         {
            name: 'Jodi',
            handle: '@takeMeSailing',
            profileImage: 'https://joeschmoe.io/api/v1/jodi',
            bio: 'bio',
            location: 'Tulsa, OK'
          },
          {
            name: 'Jean',
            handle: '@kittyKat',
            profileImage: 'https://joeschmoe.io/api/v1/jean',
            bio: 'bio',
            location: 'New York, NY'
          },
          {
            name: 'Jeri',
            handle: '@gimmeAllTheIceCream',
            profileImage: 'https://joeschmoe.io/api/v1/jeri',
            bio: 'bio',
            location: 'San Francisco, CA'
          },
          {
            name: 'Jerry',
            handle: '@whoopThereItIs',
            profileImage: 'https://joeschmoe.io/api/v1/jerry',
            bio: 'bio',
            location: 'Salt Lake City, UT'
          },
          {
            name: 'Jane',
            handle: '@nope_nope',
            profileImage: 'https://joeschmoe.io/api/v1/jane',
            bio: 'bio',
            location: 'Los Angeles, CA'
          },
          {
            name: 'Jaqueline',
            handle: '@jackie420',
            profileImage: 'https://joeschmoe.io/api/v1/jaqueline',
            bio: 'bio',
            location: 'Phoenix, AZ'
          },
          {
            name: 'Jai',
            handle: '@bananananana',
            profileImage: 'https://joeschmoe.io/api/v1/jai',
            bio: 'bio',
            location: 'Portland, OR'
          }
      ]);
      const password = chance.hash({ length: 15 });

      return User.create({ ...user, password });
    })
  )
  .then(users => {
    return Promise.all([...Array(100)].map(() => {
      const text = chance.sentence({ words: 10 });

      return Chirp.create({ handle: chance.pickone(users)._id, text });
    }));
  });
};
