const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = () => {
  return jwt({
    secret: jwksRsa({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 10,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_CLIENT_ID,
    issuer: `http://${process.env.AUTH0_DOMAIN}`,
    algorithms: ['RS256']
  });
};
