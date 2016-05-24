var mongoose = require('mongoose');


module.exports = function(config) {
  console.log(config.db)
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function(err) {
    console.log("Mongo Err" + err)
  });
  db.once('open', function() {
    console.log('Database is running')
  })
}