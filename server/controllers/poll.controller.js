const Poll = require('../models/poll');
const User = require('../models/user');
const cuid = require('cuid');


module.exports = {
  postPoll
};


function postPoll(req, res) {
  const body = req.body;
  if (!body) {
    console.error('POST_POLL: Error, nothing given to create poll within request body.');
    res.statusMessage = 'Nothing given to create poll within request body.';
    res.status(412).end();
  } else if (!body.title || !body.choices || !body.user_id || !body.user_name) {
    console.error(`POST_POLL: Error, prerequisite properties not met for poll creation in request body:`, body);
    res.statusMessage = 'Prerequisite properties not met for poll creation.';
    res.status(412).end();
  } else {
    Poll.where({ title: body.title }).findOne(function (err, existingPoll) {
      if (!!existingPoll) {
        console.error(`POST_POLL: Error, poll with title "${body.title}" already exists:`, existingPoll);
        res.statusMessage = `Poll with title "${body.title}" already exists.`;
        res.status(412).end();
      } else {
        const userId = body.user_id;
        User.where({ "cuid": userId }).findOne(function (err, user) {
          if (err) {
            console.error(`POST_POLL: Error while searching for existing user with id "${userId}": ${err}`);
            res.statusMessage = `Error while searching for existing user with id "${userId}"`;
            res.status(502).end();
          } else if (!user) {
            console.error(`POST_POLL: Error, unable to find existing user with id "${userId}".`);
            res.statusMessage = `Unable to find existing user with id "${userId}".`;
            res.status(410).end();
          } else if (!user.name || !user.cuid) {
            console.error(`POST_POLL: Error, user with id "${userId}" does not have sufficient info required to create poll.`);
            res.statusMessage = `User with id "${userId}" does not have sufficient info required to create poll.`;
            res.status(412).end();
          } else {
            const newPoll = new Poll(req.body);
            newPoll.set({
              user_name: user.name,
              user_id: user.cuid
            });
            newPoll.save(function(err, poll) {
              if (err) {
                console.error(`POST_POLL: Error while saving new poll:`, newPoll, err);
                res.statusMessage = `Error while saving new poll: ${err}`;
                res.status(502).end();
              } else if (!poll) {
                console.error(`POST_POLL: Error, unable to find new poll after save:`, newPoll);
                res.statusMessage = 'Unable to find new poll after save.';
                res.status(410).end();
              } else {
                console.log(`POST_POLL: Successfully created poll: ${poll}`);
                const activity = {
                  type: 'added',
                  actionColor: 'green',
                  poll_id: poll.cuid,
                  user_id: user.cuid,
                  message: `Created poll "${poll.title}".`,
                };
                addUserActivity(user.cuid, activity);
                res.statusMessage = 'Successfully created poll.';
                res.status(201).send({ poll, message: `Poll "${poll.title}" created.` });
              }
            });
          }
        });
      }
    });
  }
};



// ==========================================================

function addUserActivity(id, activity) {
  activity.date_created = new Date().toISOString();
  activity.cuid = cuid();
  User.findOneAndUpdate(
    { "cuid": id },
    { $push: { "activity":
      {
        $each: [ activity ],
        $sort: { date_created: -1 }
      }
    }},
    { "new": true },
    function(err, user) {
      if (err) {
        console.error(`ACTIVITY UPDATE: Error while adding activity to user "${id}":`, activity);
      } else if (!user) {
        console.error(`ACTIVITY UPDATE: Cannot find user at cuid "${id}" to add new activity:`, activity);
      } else {
        console.error(`ACTIVITY UPDATE: Successfully added activity to user "${id}":`, activity);
      }
    }
  );
}
