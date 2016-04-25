
module.exports = function(app, expressHandlebars, path) {

  app.engine('.hb', expressHandlebars({
    extname: '.hb',
    layoutsDir: path.join(__dirname, '../views/layouts')
  }));
  app.set('view engine', '.hb');

  app.set('views', path.join(__dirname, '../views'));

}