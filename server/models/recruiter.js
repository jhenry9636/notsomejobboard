var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('../common/validators')


module.exports = function() {
  
	var recruiterSchema = new Schema({
		givenName: {
			type: String,
      required: [true, 'First name is required.'],
      validate: validator.requiredField
		},
		familyName : {
      type: String,
      required: [true, 'Last Name is required.'],
      validate: validator.requiredField
    },
		primaryEmail: {
      type: String,
      required: [true, 'Email address is required.'],
      validate: validator.emailAddress
    },
		password: {
      type: String,
      required: [true, 'Password is required.'],
      //validate: validator.password
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required.'],
      validate: validator.requiredField
    },
    companyCity: {
      type: String,
      required: [true, 'Company city is required.'],
      validate: validator.requiredField
    },
    companyState: {
      type: String,
      required: [true, 'Company state is required.'],
      enum: validator.state
    },
    companyZip: {
      type: String,
      required: [true, 'Company zip code is required.'],
      validate: validator.zipCode
    },
    companyPrimaryPhone: {
      type: String,
      required: [true, 'Company phone number is required.'],
      validate: validator.phoneNumber
    },
		companyAddress1: {
      type: String
    },
    companyAddress2: {
      type: String
    },
    sentContactRequests: [{
      type: Schema.ObjectId,
      ref: 'Request'
    }],
    approvedContactRequests: [{
      type: Schema.ObjectId,
      ref: 'Request'
    }],
		reviews: [{
			type: Schema.ObjectId,
			ref: 'Review'
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
