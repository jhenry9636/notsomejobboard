var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

  var developerSchema = new Schema({
    givenName: String,
    familyName : String,
    zipCode: String,
    primaryPhone: String,
    secondaryPhone: String,
    primaryEmail: String,
    password: String,
    address1: String,
    address2: String,
    technologies: [String],
    locations: [{
      type : Schema.ObjectId,
      ref : 'Location'
    }],
    receivedContactRequests: [{
      type : Schema.ObjectId,
      ref : 'Request'
    }],
    compensationType: String,
    compensationMin: String,
    validated: {
      default: false,
      type: Boolean
    },
    salt: String,
    joinedAt: {
      type: Date,
      default: Date.now
    }
  })

  return mongoose.model('Developer', developerSchema)
}