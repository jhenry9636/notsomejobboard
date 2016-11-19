var client = require('twilio')('AC1d6ec3633ff6246a6cb8d47a1e58a081','0dd70667eae228a08cf8171ac6217a7e');
var q = require('q');

var sendMessage = function(to, from, message) {
  var deferred = q.defer();

  client.sendMessage({
    to: '+13107540662',
    from: '16506678267',
    body: message,
    mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg"
  }, function(err, data) {
    if (err) {
      deferred.reject(err)
    }
    else {
      deferred.resolve(data)
    }
  })

  return deferred.promise;
}

exports.textRequest = function(recieverPhone) {
  var deferred = q.defer();

  var message =
      '\nJarrad from ERP consulting has an opportunity ' +
      'with Yahoo that may be a great match.'+
      '\n40 min commute (please see map)' +
      '\n' +
      '\nLooks like its paying $80/hr near Downtown Chicago using ' +
      'Angular.js, Node.js, LoDash.js' +
      '\n' +
      '\nShould we send your contact info?' +
      '\n(Please reply yes or no)';

  sendMessage('+14155068585', 16506678267, message)
    .then(function(data) {
      deferred.resolve(data)
    }, function(err) {
      deferred.reject(err)
    })

  return deferred.promise;
}

exports.textAccepted = function(emailAddress, token, userId) {
}

exports.textRejected = function(emailAddress, token, userId) {
}

exports.sendConfirmed = function(emailAddress, token, userId) {
}