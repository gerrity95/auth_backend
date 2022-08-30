const logger = require('../middleware/logger');
const httpStatus = require('http-status');
const db = require('../models/index');
const Recipe = db.recipe;
const Category = db.category;
const ApiError = require('../utils/ApiError');

async function validateCategories(recipeBody) {
  const categories = await Category.find({});
  console.log(categories);

  recipeBody.forEach((recipe) => {
    if (typeof recipe.category === 'string') {
      if (!categories.find((e) => e.name === recipe.category)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Category passed into request');
      }
    } else {
      recipe.category.forEach((rec) => {
        if (!categories.find((e) => e.name === rec)) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Category passed into request');
        }
      });
    }
  });
  return true;
};

module.exports= {
  validateCategories,
};
