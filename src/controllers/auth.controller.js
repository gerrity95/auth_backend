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
    logger.info('Attempting to create new user...');
    const signupDetails = await authService.signUp(req);
    return res.status(signupDetails.status).send(signupDetails.data);
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
