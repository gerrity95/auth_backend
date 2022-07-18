const logger = require('../middleware/logger');
const userService = require('../services/user.service');

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userDetails = async function(req, res, next) {
  try {
    logger.info('Attempting to gather user details...');
    const userDetails = await userService.userDetails(req);
    return res.status(userDetails.status).send(userDetails.data);
  } catch (err) {
    logger.error('Error attempting to gather user details');
    logger.error(err);
    return next(err);
  }
};
