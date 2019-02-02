require('dotenv').config({ path: '../.env' });

const express = require('express');
const passport = require('passport');
const configurePassport = require('./config/passport');
const configureExpress = require('./config/express');
const configureRoutes = require('./config/routes');
const configureDb = require('./config/database');

const ENV_PRODUCTION = process.env.NODE_ENV === 'production';
const app = express();


// ==========================================================
//  INITIALIZE

configurePassport(app, passport);

configureExpress(app, ENV_PRODUCTION);

configureRoutes(app, passport);

configureDb(process.env.MONGODB_URI);


module.exports = app;