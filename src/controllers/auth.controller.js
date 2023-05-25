const authService = require('../services/auth.service');
const logger = require('../middleware/logger');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');

exports.signup = catchAsync(async function(req, res, next) {
  /* Some reason not working whene extracted to a new function need to figure it out */
  try {
    logger.info('Attempting to create new user...');
    const signupDetails = await authService.signUp(req);
    return res.status(httpStatus.OK).send(signupDetails);
  } catch (err) {
    logger.error('Error attempting to Sign up');
    logger.error(err);
    return next(err);
  }
});

exports.signin = catchAsync(async function(req, res, next) {
  try {
    logger.info('Attempting to sign in...');
    const signinDetails = await authService.signIn(req);
    return res.status(signinDetails.status).send(signinDetails.data);
  } catch (err) {
    logger.error('Error attempting to Sign In');
    logger.error(err);
    return next(err);
  }
});

exports.refreshToken = catchAsync(async (req, res, next) => {
  try {
    logger.info('Attempting to refresh tokens...');
    const refreshToken = await authService.refreshToken(req);
    return res.status(httpStatus.OK).send(refreshToken);
  } catch (err) {
    logger.error('Error attempting to generate refresh token');
    logger.error(err);
    return next(err);
  };
});
