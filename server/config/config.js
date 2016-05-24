var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  db: 'mongodb://jhenry:deanmilton@ds045242.mlab.com:45242/whenrecruited',
  development: {
    rootPath: rootPath,
    port: process.env.PORT || 8080
  },
  production: {
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
};