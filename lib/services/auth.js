const { ManagementClient } = require('auth0');

const auth0 = new ManagementClient({
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
  //same scope as in auth0site tab machine to machine scope
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

//populateUsers same as one in model, the below is to prevent duplication
const populateUsers = async(models, key = 'user') => {
  const ids = models.map(models => models[key]);
  const noRepeatIds = new Set(ids);
  const noRepeatIdsAsAnArray = [...noRepeatIds];

  const users = await getUsers(noRepeatIdsAsAnArray);
  //models here refers to tweets (that is in our model file)
  return models.map(model => ({
    ...model,
    [key]: users.find(u => u.user_id === model[key])
  }));
};

module.exports = {
  getUser,
  getUsers,
  populateUsers
};


