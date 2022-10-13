const logger = require('../middleware/logger');
const httpStatus = require('http-status');
const db = require('../models/index');
const Recipe = db.recipe;
const Category = db.category;
const ApiError = require('../utils/ApiError');
const {validateCategories, getRandomInt} = require('../utils/recipe.helper');

async function createRecipe(req) {
  const categoryId = await Category.findOne({name: req.body.category});
  if (!categoryId) {
    logger.error(`Invalid Category: ${req.body.category} submitted with recipe.`);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Category submitted');
  }
  let imagePath;
  if (typeof req.body.image === 'undefined') {
    imagePath = generatePlaceholderImage();
  } else {
    imagePath = req.body.image;
  }
  try {
    const recipeBody = {
      name: req.body.name,
      description: req.body.description,
      category: [categoryId.name],
      image: imagePath,
      ingredients: req.body.ingredients,
      ...(typeof req.body.is_sample != 'undefined') && {is_sample: req.body.is_sample},
      ...(typeof req.body.servings != 'undefined') && {servings: req.body.servings},
      ...(typeof req.body.cooking_time != 'undefined') && {cooking_time: req.body.cooking_time},
      ...(typeof req.body.website != 'undefined') && {website: req.body.website},
      ...(typeof req.body.tags != 'undefined') && {tags: req.body.tags},
      ...(typeof req.body.prep_instructions != 'undefined') && {prep_instructions: req.body.prep_instructions},
      ...(typeof req.body.cooking_instructions != 'undefined') && {cooking_instructions: req.body.cooking_instructions},
      ...(typeof req.body.user_id != 'undefined') && {user_id: req.body.user_id},
    };

    const recipe = new Recipe(recipeBody);
    const newRecipe = await recipe.save();
    logger.info('Successfully added new recipe!');
    return {id: newRecipe._id};
  } catch (err) {
    logger.error('Error attempting to Create New Recipe');
    logger.error(err);
    console.log(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error attempting to create recipe');
  }
}

async function getRecipeById(recipeId) {
  return await Recipe.findById(recipeId);
}

async function getRecipe(query) {
  const queryBody = {
    ...(typeof query.recipeId != 'undefined') && {_id: query.recipeId},
    ...(typeof query.userId != 'undefined') && {user_id: query.userId},
  };
  const recipes = await Recipe.find(queryBody);
  if (!recipes || !recipes.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unable to find any recipes.');
  }
  logger.info(`Success gathering recipe(s) using recipe: ${query.recipeId}, user ${query.userId}`);
  return recipes;
}

async function getSampleRecipes(count) {
  try {
    const sample = await Recipe.aggregate([{$sample: {size: count}}]);
    return sample;
  } catch (err) {
    logger.error('Error attempting to get sample recipes');
    logger.error(err);
    throw err;
  }
}

async function bulkAddRecipes(body) {
  const recipes = body.recipes;
  const validCategories = await validateCategories(recipes);
  if (!validCategories) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid categories passed in recipe body.');
  }
  const bulkAdd = await Recipe.insertMany(recipes);
  logger.info(bulkAdd);

  return bulkAdd;
}

const generatePlaceholderImage = () => {
  // Function to generate the path to one of our placeholder images if no image is provided
  const randomNumber = getRandomInt(14);
  return `placeholders/temp${randomNumber}.jpg`;
};


module.exports= {
  createRecipe,
  getRecipeById,
  getRecipe,
  getSampleRecipes,
  bulkAddRecipes,
};
