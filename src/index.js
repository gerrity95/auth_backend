const mongoose = require('mongoose');
const ApiError = require('./utils/ApiError');
const app = require('./app');
const logger = require('./middleware/logger');
const dotenv = require('dotenv');
dotenv.config();

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  PORT,
} = process.env;

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
  directConnection: true,
  useUnifiedTopology: true,
};

// eslint-disable-next-line max-len
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_DB}&replicaSet=replicaset&retryWrites=true`;

mongoose.connect(url, options).then( function() {
  logger.info('MongoDB is connected');
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}.`);
  });
}).catch( function(err) {
  logger.error(err);
  throw new ApiError(err);
});
