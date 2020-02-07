/**
 * Importing required application modules
 */
const express   = require('express'); // Framework for building the API
const app       = express();
const routes    = require('./routes/api');
const port      = process.env.PORT || 3000;
const cors = require('cors')
require('./migrations') // consider putting this somewhere else and using an npm script to run it

/**
 * Injecting middlewares
 */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1', routes());
app.use(cors());

/**
 * Start app with default HTTP module and specify urls inside it
 */
app.listen(port, ()=>{console.log(`Listening on port ${port}..`)});