const logger = require('../middleware/logger');
const httpStatus = require('http-status');
const db = require('../models/index');
const Recipe = db.recipe;
const Category = db.category;
const ApiError = require('../utils/ApiError');

async function createRecipe(req) {
  // TODO Get category ID
  const categoryId = await Category.findOne({name: req.body.category});
  if (!categoryId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Category submitted');
  }
  try {
    const recipeBody = {
      name: req.body.name,
      description: req.body.description,
      category: [categoryId.name],
      ingredients: req.body.ingredients,
      ...(typeof req.body.is_sample != 'undefined') && {is_sample: req.body.is_sample},
      ...(typeof req.body.servings != 'undefined') && {servings: req.body.servings},
      ...(typeof req.body.cooking_time != 'undefined') && {cooking_time: req.body.cooking_time},
      ...(typeof req.body.website != 'undefined') && {website: req.body.website},
      ...(typeof req.body.image != 'undefined') && {image: req.body.image},
      ...(typeof req.body.tags != 'undefined') && {tags: req.body.tags},
      ...(typeof req.body.prep_instructions != 'undefined') && {prep_instructions: req.body.prep_instructions},
      ...(typeof req.body.cooking_instructions != 'undefined') && {cooking_instructions: req.body.cooking_instructions},
    };

    const recipe = new Recipe(recipeBody);
    const newRecipe = await recipe.save();
    return {id: newRecipe._id};
  } catch (err) {
    logger.error('Error attempting to Create New Recipe');
    logger.error(err);
    console.log(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error attempting to create recipe');
  }
}


module.exports= {
  createRecipe,
};
