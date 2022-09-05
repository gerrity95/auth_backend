const express = require('express');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const inputRouter = require('./input.routes');
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
  {
    path: '/input',
    route: inputRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
