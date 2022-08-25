const Joi = require('joi');
const {objectId} = require('./custom.validation');

const createRecipe = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    servings: Joi.string(),
    cooking_time: Joi.string(),
    website: Joi.string(),
    image: Joi.string(),
    tags: Joi.array(),
    ingredients: Joi.array().required(),
    prep_instructions: Joi.array(),
    cooking_instructions: Joi.array(),
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