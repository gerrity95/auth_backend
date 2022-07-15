const logger = require('../middleware/logger');
const db = require('../models');
const User = db.user;

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

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};
module.exports = verifySignUp;
