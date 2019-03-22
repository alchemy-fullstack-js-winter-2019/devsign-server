require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

//because our front end app runs on 7890 these cant be the same. 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('port is running');
});
