const logger = require('../middleware/logger');


async function createRecipe(req) {
  try {
    return true;
  } catch (err) {
    logger.error('Error attempting to Create Recipe');
    logger.error(err);
    throw (err);
  }
}

module.exports= {
  createRecipe,
};
