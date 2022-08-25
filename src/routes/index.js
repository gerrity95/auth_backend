const express = require('express');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const recipeRouter = require('./recipe.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/recipe',
    route: recipeRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
