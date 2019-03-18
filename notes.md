## Connecting front -> back

CopyWebPackPlugin
Public/redirect
GAC push
go to netlify

authenticate via github
npm run build (build command)
dist (publish)
Deploy site

site settings - build and deploy
build environment variables
auth0 client id
redirect (change to new netlify site/callback)
(copy from front end .env file)
save
Go to auth0 - login

- applications
- default app
- add new callback url (separate with comma)

Back to netlify

- trigger deploy
- Now if you push to master it updates deployed site automatically

back end server
heroku dashboard
heroku git url
in terminal - git remote add heroku 'heroku url'
heroku addons:create mongolab:sandbox -a ::name of app::

no access?

- heroku auth:login
- then login
  add all auth0 to heroku
  can do git push heroku master or set up continous integration with travis

add to travis
deploy:

- provider: heroku
- api_key:
- secure: ruby not npm??
  gem-ruby thing to add api_key???????????????????????

Front end accesses the back end as if it were an api

in development mode
in front end .env API_URL=localhost
in api call to back end we fetch(process.env.API_URL)

in production mode
we put the heroku url in netlify in API_URL

Now we can take away the promise.resolve stuff and start fetching from the actual api routes.

- handle errors

```
export const getTweets = () => {
  return fetch(`${process.env.API_URL}/tweets`, {
    headers: {
      Authorization: `Bearer ${getToken(store.getState())}
    }
  })
  .then(res => [res.ok, res.json()])
  .then(([ok, json]) => {
    if(!res.ok) throw 'ERROR';
    return json;
});
}
```

Add this to your fetch actions with REJECTED then add to selectors and then to withFetch OR just a reg component as a prop -> check for prop and handle accordingly

# cors.js

```
module.exports = {req, res, next} => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', '*');
  next();
}
```
