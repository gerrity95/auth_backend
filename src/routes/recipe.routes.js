const express = require('express');
const router = express.Router();
const validation = require('../validations/recipe.validation');
const controller = require('../controllers/recipe.controller');


router.use(function(req, res, next) {
  res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept',
  );
  next();
});

// GET REQUESTS
router.get('/api/auth/recipe/:recipeId', validation.getRecipe, controller.getRecipe);

// POST REQUESTS
router.post('/api/auth/recipe', validation.createRecipe, controller.createRecipe);


module.exports = {
  router: router,
};
