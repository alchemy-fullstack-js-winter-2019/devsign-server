const { ManagementClient } = require('auth0');

const auth0 = new ManagementClient({
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET, 
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
  scope: 'read:users'
});

// get user by id
const getUser = id => {
  return auth0.getUser({ id });
};

// Get all of the users by id
const getUsers = ids => {
  if(ids.length < 1) return Promise.resolve([]);
  return auth0.getUsers({
    q: `user_id: ${ids.join(' OR ')}`
  });
};

// dedupe so we don't ask for same user over and over
const populateUsers = async(models, key = 'user') => {
  console.log('models', models);
  // go through all of the models and grab the user id
  const ids = models.map(models => models[key]);

  // make a set of unique ids
  const noDupesIds = new Set(ids);

  // change the set back into an array because the getUsers fn takes an array as an arg
  const noDupesIdsAsArray = [...noDupesIds];

  // fetch all the deDuped users by id using id set as arg
  const users = await getUsers(noDupesIdsAsArray);

  // models = the data from mongodb - populates with auth0 instead of with the db itself...send to front end via routes
  return models.map(model => ({
    ...model,
    [key]: users.find(u => u.user_id === model.user)
  }));
};

module.exports = {
  getUser,
  getUsers,
  populateUsers
};
