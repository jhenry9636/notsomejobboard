var mongoose = require('mongoose');


module.exports = function() {
  mongoose.connect('mongodb://jhenry:deanmilton@ds045242.mlab.com:45242/whenrecruited');
  var db = mongoose.connection;
  db.on('error', function(err) {
    console.log("Mongo Err" + err)
  });
  db.once('open', function() {
    console.log('Database is running')
  })
}