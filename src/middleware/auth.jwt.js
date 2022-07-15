const logger = require('../middleware/logger');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

const {TokenExpiredError} = jwt;
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    logger.info('Access token has expired. Returning 401');
    return res.status(401).send({message: 'Unauthorized! Access Token was expired!'});
  }
  logger.error('Unauthorized request made');
  return res.sendStatus(401).send({message: 'Unauthorized!'});
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      logger.info('No token provided or incorrect header passed in through request.');
      return res.status(401).send({message: 'No token provided!'});
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        logger.error('Error attempting to verify token');
        logger.error(err);
        return catchError(err, res);
      }
      req.userId = decoded.id;
      next();
    });
  } else {
    logger.info('No token provided in request');
    return res.status(401).send({message: 'No token provided!'});
  }
};


const authJwt = {
  verifyToken,
};
module.exports = authJwt;
