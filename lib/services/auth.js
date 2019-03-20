const { ManagementClient } = require('auth0');

const auth0 =  new ManagementClient({
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
  scope: 'read:users'
});

const getUser = id => {
  return auth0.getUser({ id });
};

const getUsers = ids => {
  return auth0.getUsers({
    q: `user_id: ${ids.join(' OR ')}` 
  });
};

const populateUsers = (models, key = 'user') => {
  const ids = models.map(models => models[key]);
  const deDup = new Set(ids);
  const deDupIdsAsArray = [...deDup];

  const users = await getUsers(deDupIdsAsArray);

  return models.map(model => ({
    ...model,
    [key]: users.find(u => u.user_id === model[key])
  }))
}; 

module.exports = {
  getUser,
  getUsers,
  populateUsers

}