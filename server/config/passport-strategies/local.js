/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */

const LocalStrategy = require('passport-local').Strategy;
const userController = require('../../controllers/user.controller');

 /*
 By default, LocalStrategy expects to find credentials in parameters named username and password.
 If your site prefers to name these fields differently, options are available to change the defaults.
 */

module.exports = new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
  }, function(username, password, done) {
    return userController.loginLocalUser(username, password, done);
  }
);
