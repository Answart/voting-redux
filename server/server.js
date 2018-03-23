const express = require('express');
const configureExpress = require('./config/express');

//=====================================
//  INITIALIZE
//-------------------------------------

const ENV_PRODUCTION = process.env.NODE_ENV === 'production';
const app = express();


configureExpress(app, ENV_PRODUCTION);


module.exports = app;
