const Joi = require('joi');
const {objectId} = require('./custom.validation');

const createRecipe = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    is_sample: Joi.bool(),
    servings: Joi.number(),
    cooking_time: Joi.string(),
    website: Joi.string(),
    image: Joi.string(),
    tags: Joi.array(),
    ingredients: Joi.array().required(),
    prep_instructions: Joi.array(),
    cooking_instructions: Joi.array(),
    user_id: Joi.array(),
    author: Joi.string(),
  }),
};

const getRecipe = {
  query: Joi.object().keys({
    recipeId: Joi.string().custom(objectId),
    userId: Joi.string().custom(objectId),
  }),
};

const sampleRecipes = {
  params: Joi.object().keys({
    count: Joi.number().required(),
  }),
};

const bulkRecipes = {
  body: Joi.object().keys({
    recipes: Joi.array().required(),
  }),
};

const addUser = {
  params: Joi.object().keys({
    recipeID: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    user_id: Joi.string().custom(objectId).required(),
  }),
};

module.exports= {
  addUser,
  createRecipe,
  getRecipe,
  sampleRecipes,
  bulkRecipes,
};
