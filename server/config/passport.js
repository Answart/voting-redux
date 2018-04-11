const User = require('../models/user');


module.exports = (app, passport) => {

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
