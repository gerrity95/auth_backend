const db = {};
db.user = require('./user.model');
db.role = require('./role.model');
db.refreshToken = require('./refreshtoken.model');
db.recipe = require('./recipe.model');
db.ROLES = ['user', 'admin', 'moderator'];
module.exports = db;
