require('dotenv').config({ path: '../.env' });

const express = require('express');
const passport = require('passport');
const configurePassport = require('./config/passport');
const configureExpress = require('./config/express');
const configureRoutes = require('./config/routes');
const models = require('./models');

//=====================================
//  INITIALIZE
//-------------------------------------

const ENV_PRODUCTION = process.env.NODE_ENV === 'production';
const app = express();


configurePassport(app, passport);
configureExpress(app, ENV_PRODUCTION);
configureRoutes(app, passport);
models.connect(process.env.MONGO_URL);


module.exports = app;
