const express = require('express');
const router = express.Router();
const {verifySignUp} = require('../middleware');
const validate = require('../middleware/validate');
const controller = require('../controllers/auth.controller');
const validation = require('../validations/auth.validation');


router.use(function(req, res, next) {
  res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept',
  );
  next();
});


// POST ROUTES
router.post('/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      // verifySignUp.validatePassword,
    ],
    controller.signup);
router.post('/signin', [validate(validation.signIn)], controller.signin);
router.post('/refreshtoken', [validate(validation.refreshToken)], controller.refreshToken);

module.exports = router;
