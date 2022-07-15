const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function signUp(req) {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save(async (err, user) => {
    if (err) {
      console.log(err);
      return {status: 500, data: {message: err}};
    }
    Role.findOne({name: 'user'}, async (err, role) => {
      if (err) {
        console.log(err);
        return {status: 500, data: {message: err}};
      }
      user.roles = [role._id];
      user.save(async (err) => {
        if (err) {
          console.log(err);
          return {status: 500, data: {message: err}};
        }
        console.log('User was registered successfully!' );
        const token = jwt.sign({id: user.id}, config.secret, {
          expiresIn: config.jwtExpiration,
        });
        const refreshToken = await RefreshToken.createToken(user);
        return {'status': 200, 'data': {
          id: user._id,
          accessToken: token,
          refreshToken: refreshToken,
        }};
      });
    });
  });
}

async function signIn(req) {
  try {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
      return {status: 404, data: {message: 'Uset Not Found'}};
    }
    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
    );
    if (!passwordIsValid) {
      return {status: 401, data: {accessToken: null,
        message: 'Incorrect Username / Password'}};
    }
    const token = jwt.sign({id: user.id}, config.secret, {
      expiresIn: config.jwtExpiration, // 24 hours
    });
    const refreshToken = await RefreshToken.createToken(user);
    return {status: 200, data: {
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
      refreshToken: refreshToken,
    }};
  } catch (err) {
    console.log('Error attempting to sign in');
    console.log(err);
    throw (err);
  };
};

async function refreshToken(req) {
  const {refreshToken: requestToken} = req.body;
  if (requestToken == null) {
    return {status: 403, data: {message: 'Refresh Token is required!'}};
  }
  try {
    const refreshToken = await RefreshToken.findOne({token: requestToken});
    if (!refreshToken) {
      return {status: 403, data: {message: 'Refresh token is not in database!'}};
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {useFindAndModify: false}).exec();
      return {status: 403, data: {
        message: 'Refresh token has expired. Plase make another login request'}};
    }
    const newAccessToken = jwt.sign({id: refreshToken.user._id}, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return {status: 200, data: {
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    }};
  } catch (err) {
    return {status: 500, data: {message: err}};
  }
}

module.exports = {
  signUp,
  signIn,
  refreshToken,
};
