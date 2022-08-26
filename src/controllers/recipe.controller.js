const recipeService = require('../services/recipe.service');
const logger = require('../middleware/logger');


exports.createRecipe = async function(req, res, next) {
  /* Some reason not working whene extracted to a new function need to figure it out */
  try {
    logger.info('Attempting to create new recipe...');
    const recipeDetails = await recipeService.createRecipe(req);
    return res.status(recipeDetails.status).send(recipeDetails.data);
  } catch (err) {
    logger.error('Error attempting to create new recipe');
    logger.info(err);
    return next(err);
  }
};

exports.getRecipe = async function(req, res, next) {
  // const scenario = await scenarioService.getScenarioById(req.params.scenarioId);
  // if (!scenario) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Scenario not found');
  // }
  // res.send(scenario);
  return true;
};
