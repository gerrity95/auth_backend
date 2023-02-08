module.exports = {
  apps: [{
    name: 'Authentication Backend Template',
    script: './src/index.js',
    watch: true,
    ignore_watch: ['logs/server.log', 'node_modules', 'logs', 'dbdata'],
    time: true,
    error_file: '/var/log/auth_backend/error.log',
    out_file: '/var/log/auth_backend/app.log',
  }],
};
