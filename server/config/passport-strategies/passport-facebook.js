const FacebookStrategy = require('passport-facebook').Strategy;
const userController = require('../../controllers/user.controller');

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
const transformProfile = (profile) => {
  let userData = {
    provider: "Facebook",
    providerID: profile.id,
    // email: profile.emails[0].value,
    // avatar: profile.picture.data.url,
    // avatar2: profile.photos[0].value,
    emailVerified: true
  };
  userData.name = profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`;
  userData.picture = `https://graph.facebook.com/${userData.providerID}/picture?type=large`;
  userData.location = (profile._json.location) ? profile._json.location.name : '';
  userData.email = profile._json.email;
  return userData;
};


module.exports = new FacebookStrategy({
  clientID:      process.env.FB_ID,
  clientSecret:  process.env.FB_SECRET,
  callbackURL:   process.env.FB_CB_URL,
  // profileFields: process.env.FB_PROFILE_FIELDS
}, function(accessToken, refreshToken, profile, done) {
  // Allow account linking and authentication with identity provider.
  process.nextTick(function() {
    console.log('FB stuff:', accessToken, refreshToken, profile);
    const userData = transformProfile(profile);
    return userController.providerAuthentication(userData, done);
  });
});
