// // const GoogleStrategy = require('passport-google');
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const userController = require('../../controllers/user.controller');
//
// // Transform Facebook profile because Facebook and Google profile objects look different
// // and we want to transform them into user objects that have the same set of attributes
// const transformProfile = (profile) => ({
//   name: profile.displayName,
//   email: profile.emails[0].value,
//   password: "",
//   avatar: profile.picture.data.url,
//   avatar2: profile.photos[0].value,
//   provider: "Facebook",
//   providerID: profile.id,
//   emailVerified: true
// });
//
// module.exports = new GoogleStrategy({
//   clientID:      process.env.GOOG_ID,
//   clientSecret:  process.env.GOOG_SECRET,
//   callbackURL:   process.env.GOOG_CB_URL,
//   profileFields: process.env.FB_PROFILE_FIELDS
// }, function(accessToken, refreshToken, profile, cb) {
//   // let user = users.getUserByExternalId('facebook', profile.id);
//   console.log('FB stuff:', accessToken, refreshToken, profile)
//   process.nextTick(function() {
      // const userData = transformProfile(profile);
      // return userController.providerAuthentication(userData, cb);
//   })
// });


const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


module.exports = new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    User.findOne({ google: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.google = profile.id;
          user.tokens.push({ kind: 'google', accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || profile._json.image.url;
          user.save((err) => {
            req.flash('info', { msg: 'Google account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ google: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
          done(err);
        } else {
          const user = new User();
          user.email = profile.emails[0].value;
          user.google = profile.id;
          user.tokens.push({ kind: 'google', accessToken });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = profile._json.image.url;
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }
}));
