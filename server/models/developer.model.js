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
	var CandidateSchema = new Schema({
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
			// require: true,
			//unique: true
		},
		emailAddress: {
			type: 'String',
			// require: true,
			//unique: true
		},
		password: {
			type: 'String',
			// require: true
		},
		reviewsWritten: [{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}],
		authToken : {
			type: 'String',
			default: getAuthToken,
			// require: true,
			// unique: true
		},
		location: {
			type: 'String',
			// require: true
		},
		isAuthenticated: {
			type: 'Boolean',
			default: false
		},
		position: [{
			type: 'String',
			default: null
		}],
		technologies: [{
			type: 'String',
			default: null
		}],
		contactRequests: [{
			type: Schema.ObjectId,
			ref: 'ContactRequest'
		}],
		pay: {
			emplyType: {
				type: 'String',
				// require: true
			},
			comp: {
				type: 'String',
				// require: true
			}
		},
		joinedAt: {
			type: 'String',
			default : Date.now()
		}
	})


	CandidateSchema.methods.generateHash = function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(15), null);
	};

	CandidateSchema.methods.validPassword = function(password) {
		return bcrypt.compareSync(password, this.password);
	};

	return mongoose.model('Candidate', CandidateSchema)
}