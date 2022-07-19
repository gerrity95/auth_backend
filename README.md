# RESTful API Authenticated using JWT

A REST API using Node.js, Express, and Mongoose that uses JWT for authentication. It provides a basic registration and login ability as well as endpoints both accessible only through using an authenticated token + those open to the public 

Provided also is a Dockerfile to build the NodeJS application as well as a docker compose file allowing you to spin containers containing the application as well a mongo instance

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone --depth 1 https://github.com/gerrity95/auth_backend.git
cd auth_backend
npx rimraf ./.git
```

Install the dependencies:

```bash
npm install
npm install
```

Set the environment variables:

```bash
touch .env

# open .env and modify the environment variables (if needed)
# An example file is provided with some of the necessary variables: .env.example
```

## Table of Contents

- [Features](#features)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Logging](#logging)
- [Linting](#linting)



## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Docker support**
- **Linting**: with [ESLint](https://eslint.org)

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
MONGO_USERNAME=username
MONGO_PASSWORD=password
MONGO_HOSTNAME=localhost
MONGO_PORT=27017
MONGO_DB=auth_backend
JWT_SECRET_TOKEN=Thisisasecret
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--app.js          # Express app
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:8080/api/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.
