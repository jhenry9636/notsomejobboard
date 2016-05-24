var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = function() {

	var recruiterSchema = new Schema({
		givenName: String,
		familyName : String,
		primaryPhone: String,
		secondaryPhone: String,
		primaryEmail: String,
		password: String,
		businessAddress1: String,
    businessAddress2: String,
    sentContactRequests: [{
      type: Schema.ObjectId,
      ref: 'Request'
    }],
		hasValidated: {
			default: false,
			type: Boolean
		},
		salt: String,
		joinedAt: {
			type: Date,
			default: Date.now
		}
	})
  
	return mongoose.model('Recruiter', recruiterSchema)
}
