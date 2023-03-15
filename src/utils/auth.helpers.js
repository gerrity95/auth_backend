const logger = require('../middleware/logger');
const config = require('../config/auth.config');
const db = require('../database/models');
const RefreshToken = db.refreshToken;

async function updateRefreshExpiry(requestToken) {
  /* Function to update the expiry time for a refreshtoken
     assuming that the request made was with an existing valid token */
  try {
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
    const filter = {token: requestToken};
    const update = {expiryDate: expiredAt};
    const updatedRefreshToken = await RefreshToken.findOneAndUpdate(
        filter,
        update,
    );
    return updatedRefreshToken;
  } catch (err) {
    logger.error('Error attempting to update expiry on refresh token');
    logger.error(err);
    throw err;
  }
}

module.exports = {
  updateRefreshExpiry,
};
