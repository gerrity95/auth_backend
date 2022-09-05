const recipeService = require('../services/recipe.service');
const logger = require('../middleware/logger');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');


exports.createRecipe = async function(req, res, next) {
  /* Some reason not working whene extracted to a new function need to figure it out */
  try {
    logger.info('Attempting to create new recipe...');
    const recipeDetails = await recipeService.createRecipe(req);
    return res.send(recipeDetails);
  } catch (err) {
    logger.error('Error attempting to create new recipe');
    logger.info(err);
    return next(err);
  }
};

exports.getRecipe = catchAsync(async (req, res) => {
  logger.info('Attempting to get recipe...');
  const recipe = await recipeService.getRecipeById(req.params.recipeId);
  if (!recipe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recipe not found');
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
