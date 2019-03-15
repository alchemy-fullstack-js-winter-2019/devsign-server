const jwt = require('express-jwt');
const jwkRsa = require('jwks-rsa');

module.exports = () => {
    return jwt({
        credentialsRequired: process.env.NODE_ENV === 'production',
        secret: jwkRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwkRequestsPerMinute: 10,
            jwk: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
        }),
        audience: process.env.AUTH0_CLIENT_ID,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256']
    });
};
