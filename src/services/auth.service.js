const logger = require('../middleware/logger');
const config = require('../config/auth.config');
const authHelper = require('../utils/auth.helpers');
const db = require('../database/models');
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

async function signUp(req) {
  try {
    logger.info('Attempting to register a new user..');
    const role = await Role.findOne({name: 'user'});
    const user = new User({
      username: req.body.username.toLowerCase(),
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      roles: [role._id],
    });
    const newUser = await user.save();
    logger.info('User was registered successfully!');
    logger.info('Generating tokens for:' + user.id);
    const token = jwt.sign({id: user.id}, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    const refreshToken = await RefreshToken.createToken(user);
    return {
      id: newUser._id,
      accessToken: token,
      refreshToken: refreshToken,
    };
  } catch (err) {
    logger.error('Error attempting to Create User');
    logger.error(err);
    throw err;
  }
}

async function signIn(req) {
  try {
    const user = await User.findOne({
      username: req.body.username.toLowerCase(),
    });
    if (!user) {
      logger.info('Username not found.');
      throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
    }
    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
    );
    if (!passwordIsValid) {
      logger.error('Invalid username/password');
      return {
        status: httpStatus.UNAUTHORIZED,
        data: {accessToken: null, message: 'Incorrect Username / Password'},
      };
    }
    const token = jwt.sign({id: user.id}, config.secret, {
      expiresIn: config.jwtExpiration, // 24 hours
    });
    const refreshToken = await RefreshToken.createToken(user);
    return {
      status: httpStatus.OK,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
        refreshToken: refreshToken,
      },
    };
  } catch (err) {
    console.log('Error attempting to sign in');
    console.log(err);
    throw err;
  }
}

async function refreshToken(req) {
  logger.info('Attempting to refresh access token using refresh token..');
  const {refreshToken: requestToken} = req.body;
  if (requestToken == null) {
    logger.info('Refresh token missing from request body');
    throw new ApiError(httpStatus.FORBIDDEN, 'Refresh token is required!');
  }
  const refreshToken = await RefreshToken.findOne({token: requestToken});
  if (!refreshToken) {
    logger.info('Token is not in the database');
    throw new ApiError(
        httpStatus.FORBIDDEN,
        'Refresh token is not in the database!',
    );
  }
  if (RefreshToken.verifyExpiration(refreshToken)) {
    RefreshToken.findByIdAndRemove(refreshToken._id, {
      useFindAndModify: false,
    }).exec();
    logger.info('Refresh token has expired...');
    throw new ApiError(
        httpStatus.FORBIDDEN,
        'Refresh token has expired. Plase make another login request',
    );
  }
  const newAccessToken = jwt.sign(
      {id: refreshToken.user._id},
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      },
  );
  try {
    const updatedRefreshToken = await authHelper.updateRefreshExpiry(
        requestToken,
    );
    return {
      accessToken: newAccessToken,
      refreshToken: updatedRefreshToken.token,
    };
  } catch (err) {
    logger.error('Error attempting to refresh token.');
    logger.error(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
}

module.exports = {
  signUp,
  signIn,
  refreshToken,
};
