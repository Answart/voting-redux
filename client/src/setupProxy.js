const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // TODO
  const target = (process.env.NODE_ENV === 'production')
    ? 'http://localhost:8080'
    : 'http://localhost:8080';
  app.use(proxy('/api', { target }));
};
