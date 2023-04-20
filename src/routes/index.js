const express = require('express');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const recipeRouter = require('./recipe.routes');
const statusRouter = require('./status.routes');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

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
    path: '/status',
    route: statusRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get('*', async (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
});

router.post('*', async (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
});


module.exports = router;
