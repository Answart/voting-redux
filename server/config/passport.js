const User = require('../models/user');
const local = require('./passport-strategies/local');
const passportFB = require('./passport-strategies/passport-facebook');
// const passportGoogle = ('./passport-strategies/passport-google');
// const passportTwitter = ('./passport-strategies/passport-twitter');
// const passportGithub = ('./passport-strategies/passport-github');


module.exports = (app, passport) => {

  passport.use('login', local);
  passport.use(passportFB);

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser((user, cb) => cb(null, user.cuid));

  passport.deserializeUser((id, cb) => {
    User.findOne({ cuid: id }, (err, user) => cb(err, user));
  });

  // Pass the passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

};
