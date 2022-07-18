const express = require('express');
const router = express.Router();
const {authJwt} = require('../middleware');
const controller = require('../controllers/user.controller');


router.use(function(req, res, next) {
  res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
  );
  next();
});

router.get('/api/all', controller.allAccess);

router.get('/api/user', [authJwt.verifyToken], controller.userDetails);

module.exports = {
  router: router,
};
