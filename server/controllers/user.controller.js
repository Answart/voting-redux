'use strict';

const User = require('../models/user');
const Poll = require('../models/poll');
const jwt = require('jsonwebtoken');


module.exports = {
  registerLocalUser,
  loginLocalUser,
  generateToken,
  deleteUser
};


function registerLocalUser(req, res, next) {
  if (!req.body.email || !req.body.name || !req.body.password) {
    console.error(`AUTH_USER: Prerequisite properties not found for user register:`, req.body);
    res.statusMessage = 'Please pass email, name, and password.';
    return res.status(412).end();
  } else {
    User.where({ "name": req.body.name }).findOne(function (err, existingUser) {
      if (err) {
        console.error(`AUTH_USER: Error while searching for existing with name "${req.body.name}":`, err);
        res.statusMessage = `Error while searching for existing user with name "${req.body.name}".`;
        return res.status(502).end();
      } else if (!!existingUser) {
        console.error(`AUTH_USER: Error, user with name "${req.body.name}" already exists:`, existingUser);
        res.statusMessage = `User with name "${req.body.name}" already exists.`;
        return res.status(412).end();
      } else {
        const userData = {
          email: req.body.email,
          name: req.body.name,
          password: req.body.password
        }
        createUser(userData, (err, user, message) => {
          if (err) {
            console.error(`AUTH_USER: ${err}`);
            res.statusMessage = err;
            return res.status(502).end();
          } else {
            console.log(`AUTH_USER: Successfully registered new user:`, user);
            const token = generateToken(user);
            user['token'] = token;
            res.statusMessage = message;
            return res.status(200).send({ user, message });
          }
        })
      }
    });
  }
};

function deleteUser(req, res) {
  var id = req.params.userId;
  if (!id) {
    console.error(`DELETE_USER: Error, unable to find userId within params "${req.params}"`);
    res.statusMessage = `Unable to find userId within params "${req.params}"`;
    res.status(412).end();
  } else {
    User.findOneAndRemove({ "cuid": id }, function(err) {
      if (err) {
        console.error(`DELETE_USER: Error during deletion of user with id "${id}": ${err}`);
        res.statusMessage = `Error during deletion of user with id "${id}": ${err}`;
        res.status(502).end();
      } else {
        console.log(`DELETE_USER: Successfully deleted user with id "${id}".`);
        Poll.deleteMany({ "user_id": id }, function(err) {
          if (err) {
            console.error(`DELETE_USER: Error occured while deleting all polls made by user with id "${id}".`);
          } else {
            console.log(`DELETE_USER: Successfully deleted all polls made by user with id "${id}".`);
          }
        })
        res.statusMessage = `Successfully deleted user with id "${id}".`;
        res.status(200).send({ id, message: `Account deleted.` });
      }
    });
  }
};


//=====================================
// USER HELPER FUNCTIONS
//-------------------------------------

function generateToken(user) {
  //1. Dont use password and other sensitive fields
  //2. Use fields that are useful in other parts of the
  //app/collections/models
  var u = { cuid: user.cuid, name: user.name, email: user.email };
  return jwt.sign(u, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

function createUser(userData, cb) {
  userData.activity = [{
    type: 'user',
    actionColor: 'green',
    poll_id: null,
    user_id: null,
    message: 'Account created.',
    date_created: new Date().toISOString()
  }];
  var newUser = new User({ ...userData });
  newUser.save(function(err, user) {
    if (err) {
      return cb(`Error during user registration. ${err}`);
    } else if (!!user) {
      console.log(`AUTH_USER: Registered new user with name "${user.name}" and email "${user.email}".`);
      return cb(null, user, `Welcome to voting Voting Redux ${user.name}.`);
    } else {
      return cb('Unable to find new user after save.');
    }
  });
};

function loginLocalUser(name, password, cb) {
  if (!name || !password) {
    return cb(`Please enter a ${!name ? 'name' : 'password'} to log in.`);
  } else {
    User.where({ "name": name }).findOne(function(err, user) {
      if (err) {
        return cb(`Error while searching for user with name "${name}".`);
      } else if (!user) {
        return cb(`User with name "${name}" does not exist.`);
      } else {
        user.comparePassword(password, function(err, isMatch) {
          if (isMatch && !err) {
            var token = generateToken(user);
            user['token'] = token;
            return cb(null, user, `Welcome back ${user.name}.`);
          } else {
            return cb(`Incorrect password for user "${name}".`);
          }
        });
      }
    });
  }
};
