const Joi = require('joi');
const {objectId} = require('./custom.validation');

const createRecipe = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getRecipe = {
  params: Joi.object().keys({
    scenarioId: Joi.string().custom(objectId),
  }),
};

module.exports= {
  createRecipe,
  getRecipe,
};
