var expressHandlebars = require('express-handlebars');
var path = require('path');

module.exports = function(server, config) {

  server.engine('.hb', expressHandlebars({
    extname: '.hb',
    layoutsDir: config.rootPath + 'server/views/layouts',
    defaultLayout: 'main'
  }));
  server.set('view engine', '.hb');

  server.set('views', path.join(__dirname, '../views'));

}