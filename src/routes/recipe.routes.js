const express = require('express');
const router = express.Router();
const {authJwt} = require('../middleware');
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

// Route REQUESTS
router
    .route('/')
    .get([authJwt.verifyToken, validate(validation.getRecipe)], controller.getRecipe)
    .post([authJwt.verifyToken, validate(validation.createRecipe)], controller.createRecipe);

router.get('/sampleRecipes/:count', [authJwt.verifyToken, validate(validation.sampleRecipes)],
    controller.getSampleRecipes);

router.put('/user/:recipeID', [validate(validation.addUser)], controller.addUser);

module.exports = router;
