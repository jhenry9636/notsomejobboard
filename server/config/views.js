var expressHandlebars = require('express-handlebars');
var path = require('path');

module.exports = function(server) {

  server.engine('.hb', expressHandlebars({
    extname: '.hb',
    layoutsDir: path.join(__dirname, '../views/layouts')
  }));
  server.set('view engine', '.hb');

  server.set('views', path.join(__dirname, '../views'));

}