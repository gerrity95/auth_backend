const logger = require('../middleware/logger');
const db = require('../models');
const User = db.user;

async function userDetails(req) {
  try {
    const userInfo = await User.findById(req.userId);
    return {status: 200, data: userInfo};
  } catch (err) {
    logger.error('Error attempting to get user details');
    logger.error(err);
    throw err;
  }
}

module.exports = {
  userDetails,
};
