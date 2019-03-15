/* eslint-disable no-console */
require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');

const PORT = 7891;

app.listen(PORT, () => {
    console.log('LISTENING on', PORT);
});
