const express = require('express');
const UserController = require('../controllers/user.controller');


module.exports = (app, passport) => {
  const router = new express.Router();

  router.post('/api/register', UserController.registerLocalUser);

  app.use(router);
};
