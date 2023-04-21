const statusService = require('../services/status.service');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

exports.appStatus = catchAsync(async function(req, res, next) {
  const result = await statusService.getStatus();
  if (result !== 1) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'API is not in a healthy state');
  }
  res.send(httpStatus.OK, 'API is in a healthy state.');
});
