const Poll = require('../models/poll');
const User = require('../models/user');
const cuid = require('cuid');


module.exports = {
  getPolls,
  postPoll,
  updatePoll,
  updatePollVote,
  deletePoll
};


function getPolls(req, res) {
  Poll.find({}).sort('-date_created').exec((err, pollsReceived) => {
    if (err) {
      console.error(`GET_POLLS: Error, unable to find polls. ${err}`);
      res.statusMessage = `Unable to find polls. ${err}`;
      res.status(502).end();
    } else {
      let polls = pollsReceived || [];
      console.log(`GET_POLLS: Success! Number of polls: ${polls.length}`);
      res.status(200).send({ polls });
    }
  });
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

function updatePoll(req, res) {
  var id = req.params.pollId;
  var body = req.body;
  var set = {};
  if (!!('open' in body)) set["open"] = body.open;
  if (!id) {
    console.error(`UPDATE_POLL: Error, unable to find pollId within params "${req.params}".`);
    res.statusMessage = `Unable to find pollId within params "${req.params}".`;
    res.status(412).end();
  } else if (!body || (Object.keys(set).length <= 0)) {
    console.error(`UPDATE_POLL: Error, nothing given to update poll with id "${id}".`);
    res.statusMessage = `Nothing given to update poll with id "${id}".`;
    res.status(412).end();
  } else {
    Poll.findOneAndUpdate(
      { "cuid" : id },
      { $set : {
        ...set,
        "date_updated": (new Date().toISOString())
       }},
      { "new": true },
      function(err, poll) {
        if (err) {
          console.error(`UPDATE_POLL: Error while searching for poll with id "${id}": ${err}`);
          res.statusMessage = `Error while searching for poll with id "${id}": ${err}.`;
          res.status(502).end();
        } else if (!poll) {
          console.error(`UPDATE_POLL: Error, unable to find poll with id "${id}".`);
          res.statusMessage = `Unable to find existing poll with id "${id}".`;
          res.status(410).end();
        } else {
          console.log(`UPDATE_POLL: Updated poll status with poll update: ${poll}`);
          const activity = {
            type: `${poll.open ? 'open' : 'close'}`,
            actionColor: `${poll.open ? 'green' : 'orange'}`,
            poll_id: poll.cuid,
            user_id: poll.user_id,
            message: `${poll.open ? 'Opened' : 'Closed'} poll "${poll.title}".`
          };
          addUserActivity(poll.user_id, activity);
          res.statusMessage = 'Successfully updated poll.';
          res.status(200).send({ poll, message: `"${poll.title}" has been ${poll.open ? 'opened' : 'closed'}.` });
        }
      }
    );
  }
};

function updatePollVote(req, res) {
  var id = req.params.pollId;
  var body = req.body;
  if (!id) {
    console.error(`UPDATE_POLL_CHOICE: Error, unable to find pollId within params '${req.params}'.`);
    res.statusMessage = `Unable to find pollId within params '${req.params}'.`;
    res.status(412).end();
  } else if (!body || !body.choicesLabel || !body.voterId) {
    console.error(`UPDATE_POLL_CHOICE: Error, nothing given to update poll with id '${id}:`, body);
    res.statusMessage = `Prerequisite properties not met to update poll with id '${id}'.`;
    res.status(412).end();
  } else {
    const newDate = (new Date().toISOString());
    Poll.findOneAndUpdate(
      { "cuid": id, "choices.label": body.choicesLabel },
      {
        $inc: {
          "choices.$.vote": 1,
          "votes": 1
        },
        $set: { "date_updated": (new Date().toISOString()) }
      },
      { "new": true },
      function(err, poll) {
        if (err) {
          console.error(`UPDATE_POLL_CHOICE: Error while searching for poll with id "${id}": ${err}`);
          res.statusMessage = `Error while searching for poll with id "${id}": ${err}.`;
          res.status(502).end();
        } else if (!poll) {
          console.error(`UPDATE_POLL_CHOICE: Error, unable to find poll with id "${id}" and choice "${body.choicesLabel}".`);
          res.statusMessage = `Unable to find existing poll with id "${id}" and choice "${body.choicesLabel}".`;
          res.status(410).end();
        } else {
          console.log(`UPDATE_POLL_CHOICE: Updated poll choice with poll update: ${poll}`);
          const activity = {
            type: 'vote',
            actionColor: 'blue',
            user_id: poll.user_id,
            poll_id: poll.cuid,
            message: `Vote added in poll "${poll.title}" for choice "${body.choicesLabel}".`
          };
          addUserActivity(poll.user_id, activity);
          const voterActivity = { ...activity };
          voterActivity.type = 'voted';
          voterActivity.actionColor = 'purple';
          voterActivity.user_id = body.voterId;
          voterActivity.message = `Voted for "${body.choicesLabel}" in poll "${poll.title}".`;
          addUserActivity(poll.user_id, voterActivity);
          res.statusMessage = 'Successfully updated poll.';
          res.status(200).send({ poll, message: `You voted for "${body.choicesLabel}" in the poll "${poll.title}".` });
        }
      }
    );
  }
};

function deletePoll(req, res) {
  var id = req.params.pollId;
  if (!id) {
    console.error(`DELETE_POLL: Error, unable to find pollId within params "${req.params}"`);
    res.statusMessage = `Unable to find pollId within params "${req.params}"`;
    res.status(412).end();
  } else {
    Poll.findOne({ "cuid": id }, function(err, poll) {
      if (err) {
        console.error(`DELETE_POLL: Error during deletion of poll with id "${id}": ${err}`);
        res.statusMessage = `Error during deletion of poll with id "${id}": ${err}`;
        res.status(502).end();
      } else if (!poll) {
        console.error(`DELETE_POLL: Error, unable to find existing poll with id "${id}".`);
        res.statusMessage = `Unable to find existing poll with id "${id}".`;
        res.status(410).end();
      } else {
        Poll.findOneAndRemove({ "cuid": id }, function(err) {
          if (err) {
            console.error(`DELETE_POLL: Error during deletion of poll with id "${id}": ${err}`);
            res.statusMessage = `Error during deletion of poll with id "${id}": ${err}`;
            res.status(502).end();
          } else {
            console.log(`DELETE_POLL: Successfully deleted poll with id "${id}".`);
            const activity = {
              type: 'trash',
              actionColor: 'red',
              poll_id: null,
              user_id: poll.user_id,
              message: `Deleted poll "${poll.title}".`
            };
            addUserActivity(poll.user_id, activity);
            res.statusMessage = `Successfully deleted poll with id "${id}".`;
            res.status(200).json({ id, message: `Poll "${poll.title}" deleted.` });
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
