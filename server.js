require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

const PORT = 7891 ;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
