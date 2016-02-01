var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var bcrypt = require('bcryptjs');
var base64url = require('base64url');
var slug = require('slug');

module.exports = function() {

	var getAuthToken = function() {
		return base64url(crypto.randomBytes(70))
	}

	var RecruiterSchema = new Schema({
		firstName: {
			type: 'String',
			// require: true
		},
		lastName: {
			type: 'String',
			// require: true
		},
		userName: {
			type: 'String',
			// require: true		
		},
		emailAddress: {
			type: 'String',
			// require: true
		},
		password: {
			type: 'String',
			// require: true
		},
		companyName: {
			type: 'String',
			default: null
		},
		contactRequests: [{
			type: Schema.ObjectId,
			ref: 'ContactRequest'
		}],
		candidates: [{
			type: Schema.ObjectId,
			ref: 'Candidate'
		}],
		authToken : {
			type: 'String',
			default: getAuthToken,
			require: true,
			unique: true
		},
		emailVerified: {
			type: 'Boolean',
			default: false
		},
		joinedDate: {
			type: Date,
			default : Date.now()
		},
		isRecruiter: {
			type: 'Boolean',
			default: true
		}
	})

	RecruiterSchema.methods.generateHash = function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(15), null);
	};

	RecruiterSchema.methods.validPassword = function(password) {
		return bcrypt.compareSync(password, this.password);
	};

	return mongoose.model('Recruiter', RecruiterSchema)

}
