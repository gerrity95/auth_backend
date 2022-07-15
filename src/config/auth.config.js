const {
  JWT_SECRET_TOKEN,
} = process.env;

module.exports = {
  secret: JWT_SECRET_TOKEN,
  jwtExpiration: 60, // 1 hour
  jwtRefreshExpiration: 180, // 24 hours
};
