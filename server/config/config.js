var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  //TODO: Setup a local database instance
  development: {
    db: 'mongodb://jhenry:deanmilton@ds045242.mlab.com:45242/whenrecruited',
    rootPath: rootPath,
    port: process.env.PORT || 8080
  },
  production: {
    db: 'mongodb://jhenry:deanmilton@ds045242.mlab.com:45242/whenrecruited',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
};