const passwordValidator = require('password-validator');
const logger = require('../middleware/logger');
const db = require('../models');
const User = db.user;
const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8) // Minimum length 8
    .is().max(100) // Maximum length 100
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits(1); // Must have at least 1 digits

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  logger.info('Attempting to verify username & email');
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    if (user) {
      logger.info('Username is already in use');
      res.status(400).send({message: 'Failed! Username is already in use!'});
      return;
    }
    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }
      if (user) {
        logger.info('Email is already in use.');
        res.status(400).send({message: 'Failed! Email is already in use!'});
        return;
      }
      next();
    });
  });
};

const validatePassword = async (req, res, next) => {
  logger.info('Attempting to validate password');
  const presult = passwordSchema.validate(req.body.password, {details: true});
  if (presult.length != 0) {
    return res.status(400).send(presult);
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  validatePassword,
};
module.exports = verifySignUp;
