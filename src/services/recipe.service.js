const logger = require('../middleware/logger');


async function createRecipe(req) {
  try {
    return {status: 200, data: {
      test: 'data',
    }};
  } catch (err) {
    logger.error('Error attempting to Create Recipe');
    logger.error(err);
    throw (err);
  }
}

module.exports= {
  createRecipe,
};
