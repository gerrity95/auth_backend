const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const validation = require('../validations/recipe.validation');
const controller = require('../controllers/recipe.controller');


// router.use(function(req, res, next) {
//   res.header(
//       'Access-Control-Allow-Headers',
//       'authorization, Origin, Content-Type, Accept',
//   );
//   next();
// });

// GET REQUESTS
router.get('/:recipeId', [validate(validation.getRecipe)], controller.getRecipe);
router.get('/sampleRecipes/:count', [validate(validation.sampleRecipes)], controller.getSampleRecipes);

// POST REQUESTS
// router.post('/api/auth/recipe', [authJwt.verifyToken, validation.createRecipe], controller.createRecipe);
router.post('/', [validate(validation.createRecipe)], controller.createRecipe);

// Temp endpoint for bulk adding sample recipes
router.post('/bulkrecipes', [validate(validation.bulkRecipes)], controller.bulkRecipes);

module.exports = router;