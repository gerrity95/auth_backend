const {
  JWT_SECRET_TOKEN,
} = process.env;

module.exports = {
  secret: JWT_SECRET_TOKEN,
  jwtExpiration: 600, // 1 hour
  jwtRefreshExpiration: 1800, // 24 hours
};
