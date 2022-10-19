const express = require('express');
const ApiError = require('./utils/ApiError');
const cors = require('cors');
const app = express();
const {errorConverter, errorHandler} = require('./middleware/error');
const routes = require('./routes');
const httpStatus = require('http-status');
require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:8081',
};

// Expose Images
app.use(express.static('public'));

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// simple route

app.use('/api', routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
})

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
