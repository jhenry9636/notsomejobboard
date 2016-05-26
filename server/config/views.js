var expressHandlebars = require('express-handlebars');
var path = require('path');

module.exports = function(server, config) {

  server.engine('.handlebars', expressHandlebars({
    extname: '.handlebars',
    layoutsDir: config.rootPath + 'server/views/layouts',
    defaultLayout: 'main'
  }));
  server.set('view engine', '.handlebars');

  server.set('views', path.join(__dirname, '../views'));

}