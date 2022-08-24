const {
  JWT_SECRET_TOKEN,
} = process.env;

module.exports = {
  secret: JWT_SECRET_TOKEN,
  jwtExpiration: 60, // 1 hour
  jwtRefreshExpiration: 1800, // 24 hours
};
