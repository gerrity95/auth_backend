const httpStatus = require('http-status');
const db = require('../database/models/index');
const Category = db.category;
const ApiError = require('../utils/ApiError');

async function validateCategories(recipeBody) {
  const categories = await Category.find({});

  recipeBody.forEach((recipe) => {
    if (typeof recipe.category === 'string') {
      if (!categories.find((e) => e.name === recipe.category)) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            'Invalid Category passed into request',
        );
      }
    } else {
      recipe.category.forEach((rec) => {
        if (!categories.find((e) => e.name === rec)) {
          throw new ApiError(
              httpStatus.BAD_REQUEST,
              'Invalid Category passed into request',
          );
        }
      });
    }
  });
  return true;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = {
  validateCategories,
  getRandomInt,
};
