
const logger = require('../middleware/logger');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  directConnection: true,
  useUnifiedTopology: true,
};

// eslint-disable-next-line max-len
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?directConnection=true&authSource=${MONGO_DB}&replicaSet=replicaset&retryWrites=true`;

const connection = mongoose.connect(url, options).then( function() {
  logger.info('MongoDB is connected');
})
    .catch( function(err) {
      logger.info(err);
    });

module.exports = {
  connection,
};
