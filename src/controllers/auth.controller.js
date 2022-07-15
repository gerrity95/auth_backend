const config = require('../config/auth.config');
const authService = require('../services/auth.service');
const db = require('../models');
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;

const logger = require('../middleware/logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.signup = async function(req, res, next) {
  /* Some reason not working whene extracted to a new function need to figure it out */
  try {
    logger.info('Attempting to register a new user..');
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    user.save(async (err, user) => {
      if (err) {
        logger.error(err);
        return res.status(500).send({message: err});
      }
      Role.findOne({name: 'user'}, async (err, role) => {
        if (err) {
          logger.error(err);
          return res.status(500).send({message: err});
        }
        user.roles = [role._id];
        user.save(async (err) => {
          if (err) {
            logger.error(err);
            return res.status(500).send({message: err});
          }
          logger.info('User was registered successfully!');
          logger.info('Generating tokens for:' + user.id);
          const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: config.jwtExpiration,
          });
          const refreshToken = await RefreshToken.createToken(user);
          return res.status(200).send({
            id: user._id,
            accessToken: token,
            refreshToken: refreshToken,
          });
        });
      });
    });
  } catch (err) {
    logger.error('Error attempting to Sign up');
    logger.error(err);
    return next(err);
  }
};

exports.signin = async function(req, res, next) {
  try {
    logger.info('Attempting to sign in...');
    const signinDetails = await authService.signIn(req);
    return res.status(signinDetails.status).send(signinDetails.data);
  } catch (err) {
    logger.error('Error attempting to Sign In');
    logger.error(err);
    return next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    logger.info('Attempting to refresh tokens...');
    const refreshToken = await authService.refreshToken(req);
    return res.status(refreshToken.status).send(refreshToken.data);
  } catch (err) {
    logger.error('Error attempting to Sign In');
    logger.error(err);
    return next(err);
  };
};
