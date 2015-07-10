var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var crypto = require('crypto');
var base64url = require('base64url');

module.exports = function() {
	var getAuthToken = function() {
		return base64url(crypto.randomBytes(70))
	}
	var CandidateSchema = new Schema({
		firstName: {
			type: 'String',
			require: true
		},
		lastName: {
			type: 'String',
			require: true
		},
		userName: {
			type: 'String',
			require: true,
			//unique: true
		},
		emailAddress: {
			type: 'String',
			require: true,
			//unique: true
		},
		password: {
			type: 'String',
			require: true
		},
		reviewsWritten: [{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}],
		authToken : {
			type: 'String',
			default: getAuthToken,
			require: true,
			unique: true
		},
		location: {
			type: 'String',
			require: true
		},
		isAuthenticated: {
			type: 'Boolean',
			default: false
		},
		stack: {
			type: ['String'],
			require: true
		},
		compensation: {
			type: 'String',
			require: true
		},
		joinedAt: {
			type: 'String',
			default : Date.now()
		}
	})

	return mongoose.model('Candidate', CandidateSchema)
}