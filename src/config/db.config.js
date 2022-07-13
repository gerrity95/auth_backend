const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;

const options = {
useNewUrlParser: true,
connectTimeoutMS: 10000,
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?directConnection=true&authSource=${MONGO_DB}&replicaSet=replicaset&retryWrites=true`;
console.log(url)
let connection = mongoose.connect(url, options).then( function() {
    console.log('MongoDB is connected');
  })
    .catch( function(err) {
    console.log(err);
  });

module.exports = {
  connection: connection
}
