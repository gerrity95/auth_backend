const Joi = require('joi');

const signIn = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const refreshToken = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

module.exports= {
  signIn,
  refreshToken,
};
