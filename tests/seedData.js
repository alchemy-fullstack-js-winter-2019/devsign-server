const Post = require('../lib/models/Post');
const chance = require('chance').Chance();

function seedData(count = 5) {
  const postsToCreate = [...Array(count)].map(() => ({
    title: chance.name(),
    body: chance.sentence()
  }));

  return Post.create(postsToCreate);
}  
  
module.exports = seedData;

