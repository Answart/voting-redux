const mongoose = require('mongoose');
const cuid = require('cuid');
const crypto = require('crypto');
const sanitizeHtml = require('sanitize-html');
const securePassword = require('secure-password');
const pwd = securePassword();


const UserSchema = new mongoose.Schema({
  cuid:                 { type: String, default: cuid(), required: true },
  email:                { type: String, unique: true, lowercase: true, required: true },
  name:                 { type: String, required: true },
  password:             { type: String, required: true },

  avatar:               { type: String, required: false },
  token:                { type: String, required: false },
  emailVerified:        { type: Boolean, default: false, required: false },
  admin:                { type: Boolean, default: false, required: false },
  activity:             { type: Array, default: [], required: true },
  polls:                { type: Array, default: [], required: true },
  accounts:             { type: Array, default: [], required: false },

  date_created:         { type: 'Date', default: (new Date().toISOString()), required: true },
  date_updated:         { type: 'Date', default: (new Date().toISOString()), required: true }
}, { timestamps: true });

// Helper method to compare the passed password with the value in the database. A model method.
UserSchema.methods.comparePassword = function comparePassword(password, cb) {
  pwd.verify(Buffer.from(password), Buffer.from(this.password, 'base64'), function (err, result) {
    if (err) return cb(err);

    if (result === securePassword.INVALID_UNRECOGNIZED_HASH) return cb('This hash was not made with secure-password. Attempt legacy algorithm.');
    if (result === securePassword.INVALID) return cb('Given password incorrect.');

    if (result === securePassword.VALID_NEEDS_REHASH) {
      console.log('Password needs rehashing, wait for us to improve your safety');
      const improvedHash = pwd.hashSync(Buffer.from(password)).toString('base64');
      if (!improvedHash) {
        console.error('You are authenticated, but we could not improve your safety this time around');
      } else {
        console.error('Returning improved Hash.');
        this.password = improvedHash;
      }
      return cb(null, true);
    } else {
      return cb(null, true);
    }
  })
};

// Helper method for getting user's gravatar.
UserSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// The pre-save hook method
UserSchema.pre('save', function saveHook(next) {
  var user = this;

  if (!user.cuid) {
    user.cuid = cuid();
  };

  user.name = sanitizeHtml(user.name);

  if (!!user.provider || user.emailVerified) {
    user.emailVerified = true;
  };

  user.date_updated = new Date().toISOString();

  // if the password is modified or the user is new
  if (user.isModified('password')) {
    const hash = pwd.hashSync(Buffer.from(user.password)).toString('base64');
    if (!!hash) user.password = hash;
    next();
  } else {
    return next();
  };
});


module.exports = mongoose.model('User', UserSchema);
