const {
    JWT_SECRET_TOKEN
  } = process.env;

module.exports = {
  secret: JWT_SECRET_TOKEN
};
