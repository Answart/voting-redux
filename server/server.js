const express = require('express');
const configureExpress = require('./config/express');
const models = require('./models');

//=====================================
//  INITIALIZE
//-------------------------------------

const ENV_PRODUCTION = process.env.NODE_ENV === 'production';
const app = express();


configureExpress(app, ENV_PRODUCTION);
models.connect(process.env.MONGO_URL);


module.exports = app;
