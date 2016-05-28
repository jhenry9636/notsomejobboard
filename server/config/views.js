var path = require('path');

module.exports = function(server, config) {

  server.set('view engine', 'ejs');

  server.set('views', path.join(__dirname, '../views'));

}