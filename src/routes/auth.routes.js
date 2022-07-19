const express = require('express');
const router = express.Router();
const {verifySignUp} = require('../middleware');
const controller = require('../controllers/auth.controller');
const db = require('../models');
const Role = db.role;


router.use(function(req, res, next) {
  res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept',
  );
  next();
});

router.post('/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.validatePassword,
    ],
    controller.signup);

router.post('/api/auth/signin', controller.signin);

router.post('/api/auth/refreshtoken', controller.refreshToken);

module.exports = {
  router: router,
};

router.post('/addRoles', async (req, res, next) => {
  new Role({
    name: 'user',
  }).save((err) => {
    if (err) {
      console.log('error', err);
    }
    console.log('added \'user\' to roles collection');
  });
  new Role({
    name: 'moderator',
  }).save((err) => {
    if (err) {
      console.log('error', err);
    }
    console.log('added \'moderator\' to roles collection');
  });
  new Role({
    name: 'admin',
  }).save((err) => {
    if (err) {
      console.log('error', err);
    }
    console.log('added \'admin\' to roles collection');
  });
  return res.send({'success': true});
});
