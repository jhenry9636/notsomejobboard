var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var encrypt = require('../common/encryption')

module.exports = function() {

  var developerSchema = new Schema({
    givenName: String,
    familyName : String,
    primaryPhone: String,
    secondaryPhone: String,
    primaryEmail: String,
    password: String,
    address1: String,
    address2: String,
    state: String,
    city: String,
    zipCode: String,
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
    },
    roles : [String]
  })

  developerSchema.methods = {
    authenticate: function(passwordToMatch) {
      return encrypt.hashPwd(this.salt, passwordToMatch) === this.password;
    },
    hasRole: function(role) {
      return this.roles.indexOf(role) > -1;
    }
  };

  return mongoose.model('Developer', developerSchema)
}