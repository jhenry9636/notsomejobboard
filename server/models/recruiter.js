var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var validator = require('../common/validators');
var bcrypt = require('bcrypt');


module.exports = function() {
  
	var recruiterSchema = new Schema({
		givenName: {
			type: String,
      required: [true, 'First name field is required.'],
      validate: validator.requiredField
		},
		familyName : {
      type: String,
      required: [true, 'Last Name field is required.'],
      validate: validator.requiredField
    },
		primaryEmail: {
      type: String,
      required: [true, 'Email address field is required.'],
      validate: validator.emailAddress,
      unique: true
    },
		password: {
      type: String,
      required: [true, 'Password field is required.'],
      index: { unique: true },
      validate: validator.password
    },
    companyName: {
      type: String,
      required: [true, 'Company name field is required.'],
      validate: validator.requiredField
    },
    companyCity: {
      type: String,
      required: [true, 'Company city field is required.'],
      validate: validator.requiredField
    },
    companyState: {
      type: String,
      required: [true, 'Company state field is required.'],
      enum: validator.state
    },
    companyZip: {
      type: String,
      required: [true, 'Company zip code field is required.'],
      validate: validator.zipCode
    },
    companyPrimaryPhone: {
      type: String,
      required: [true, 'Company phone number field is required.'],
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


  recruiterSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
      if(err) throw err

      user.salt = salt

      bcrypt.hash(user.password, user.salt, function(err, hash) {
        if(err) throw err
        user.password = hash;
        next();
      });
    });
  });

  recruiterSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

	mongoose.model('Recruiter', recruiterSchema)
}
