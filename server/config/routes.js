const express = require('express');
const UserController = require('../controllers/user.controller');
const PollController = require('../controllers/poll.controller');


module.exports = (app, passport) => {
  const router = new express.Router();


  // ==========================================================
  // POLL ROUTES

  router.get('/api/polls/all', PollController.getPolls);

  router.post('/api/poll/create', PollController.postPoll);

  router.put('/api/poll/:pollId/update', PollController.updatePoll);

  router.put('/api/poll/:pollId/vote', PollController.updatePollVote);

  router.delete('/api/poll/:pollId/delete', PollController.deletePoll);


  // ==========================================================
  // USER ROUTES

  router.post('/api/register', UserController.registerLocalUser);

  router.delete('/api/user/:userId/delete', UserController.deleteUser);

  // LOCAL PASSPORT
  router.post('/api/login', function(req, res, next) {
    passport.authenticate('login', { session: false }, function(err, user, message) {
      if (err || !user) {
        res.statusMessage = err;
        return res.status(400).end();
      } else {
        req.login(user, { session: false }, function(err) {
          if (err) {
            console.error(`AUTH_USER: Error during local login. ${err}`);
            res.statusMessage = err;
            return res.status(400).end();
          } else {
            const token = UserController.generateToken(user);
            user['token'] = token;
            console.log(`AUTH_USER: Successful login for user "${user.name}":`, user);
            res.statusMessage = message;
            return res.status(200).send({ user, message });
          }
        });
      }
    })(req, res, next);
  });

  // FACEBOOK PASSPORT
  router.get('/api/auth/facebook/', passport.authenticate('facebook'));
  // router.get('/auth/facebook/', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
  router.get('/api/auth/facebook/callback/', function(req, res, next) {
    passport.authenticate('facebook', (err, user, message) => {
      if (err || !user) {
        console.error(`AUTH_USER: Error during provider login. ${err}`);
        res.statusMessage = err;
        return res.status(400).end();
      } else {
        const token = UserController.generateToken(user);
        user.token = token;
        console.log(`AUTH_USER: Successful login through ${user.provider} for user "${user.name}":`, user);
        res.statusMessage = message;
        return res.status(200).send({ user, message });
      }
    })(req,res);
  });

  // router.get('/api/github', passport.authenticate('github'));
  // router.get('/api/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect(req.session.returnTo || '/');
  // });
  // router.get('/api/google', passport.authenticate('google', { scope: 'profile email' }));
  // router.get('/api/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect(req.session.returnTo || '/');
  // });
  // router.get('/api/twitter', passport.authenticate('twitter'));
  // router.get('/api/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect(req.session.returnTo || '/');
  // });
  // router.get('/api/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
  // router.get('/api/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect(req.session.returnTo || '/');
  // });
  // router.get('/api/instagram', passport.authenticate('instagram'));
  // router.get('/api/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect(req.session.returnTo || '/');
  // });
  // /**
  //  * OAuth authorization routes. (API examples)
  //  */
  // router.get('/api/foursquare', passport.authorize('foursquare'));
  // router.get('/api/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), (req, res) => {
  //   res.redirect('/api/foursquare');
  // });
  // router.get('/api/tumblr', passport.authorize('tumblr'));
  // router.get('/api/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), (req, res) => {
  //   res.redirect('/api/tumblr');
  // });
  // router.get('/api/steam', passport.authorize('openid', { state: 'SOME STATE' }));
  // router.get('/api/steam/callback', passport.authorize('openid', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect(req.session.returnTo || '/');
  // });
  // router.get('/api/pinterest', passport.authorize('pinterest', { scope: 'read_public write_public' }));
  // router.get('/api/pinterest/callback', passport.authorize('pinterest', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect('/api/pinterest');
  // });

  router.get('/', function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(router);
};
