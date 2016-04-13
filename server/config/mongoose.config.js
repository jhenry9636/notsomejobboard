module.exports = function(mongoose) {
  mongoose.connect('mongodb://jhenry:1234@ds045242.mongolab.com:45242/whenrecruited');
  var db = mongoose.connection;
  db.once('open', function() {
    console.log('Database is running')
  })
}