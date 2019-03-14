//add seed.js and seeddata


//middleware/ensureAuth

//.env 

//route 
const ensureAuth = require
// .get('/', ensureAuth(), ) 

//create a regular webapp in auth0, only for the backend
//authorize backend application- read users

// add AUTH0_MANAGEMENT_CLIENT_ID to .env
// add AUTH0_MANAGEMENT_CLIENT_SECRET
// add AUTH0_AUDIENCE = -find the identifier on aut0 

// /lib/services/auth.js
// npm i auth0

// const { ManagmentClient } from ('auth0');
// const auth) = new Mana ({
//   clientId: process.env.AUTH0_MANAGMENT_CLIENT_ID,
//   clientSecret: ,
//   domain: process.env. AUTH0_DOMAIN,
//   audience: 
//   scope: 'read:users'
// })

// const getUser = id => {
//   return auth0.getUser({ id });
// }

// const getUsers = ids => {
//   return auth0.getUsers({
//     q: `user_id: ${ids.join(' OR ')}`
//   });
// }

// const populateUsers = (models, key = 'user') => {
//   const ids = models.map(models => models[key]);
//   //like an array but no duplicates
//   const noRepeatIds = new Set(ids);
//   const noRepeatIdsArr = [...noRepeatIds]
//   const users = await getUsers(noRepeatIdsArr);
  
//   return models.map(model => ({
//     ...model,
//     //user = whatever you have in your model
//     [key]: users.find(u => u.user_id === model[key])
//   }))
// }
// module.exports = {
//   getUser,
//   getUsers,
//   populateUsers
// };

//use populateUsers in route
//modesl/tweets.js
// .find()
// .lean()
// .then(tweets => populateUsers(tweets))
// .then(res => res.send(tweets))
// .catch(next);