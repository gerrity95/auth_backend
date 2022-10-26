const recipeService = require('../services/recipe.service');
const logger = require('../middleware/logger');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');


exports.createRecipe = catchAsync(async (req, res) => {
  logger.info('Attempting to create new recipe...');
  const recipeDetails = await recipeService.createRecipe(req);
  return res.send(recipeDetails);
});

exports.getSampleRecipes = catchAsync(async (req, res) => {
  logger.info('Attempting to gather a number of random sample recipes');
  const recipes = await recipeService.getSampleRecipes(req.params.count);
  if (!recipes) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unable to get sample recipes');
  }
  return res.send(recipes);
});

exports.getRecipe = catchAsync(async (req, res) => {
  logger.info('Attempting to get recipe...');
  const recipe = await recipeService.getRecipe(req.query);
  if (!recipe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recipe not found');
  }
  return res.send(recipe);
});

exports.addUser = catchAsync(async (req, res) => {
  logger.info('Attempting to add user to recipe...');
  const recipe = await recipeService.addUser(req.params, req.body);
  if (!recipe) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error attempting to add user to recipe');
  }
  return res.send(recipe);
});

exports.bulkRecipes = catchAsync(async (req, res, next) => {
  try {
    logger.info('Attempting to bulk add sample recipes...');
    const bulkAdd = await recipeService.bulkAddRecipes(req.body);
    return res.send(bulkAdd);
  } catch (err) {
    logger.error('Error attempting to create bulk add recipes');
    logger.info(err);
    return next(err);
  }
});
