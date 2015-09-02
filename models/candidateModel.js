var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var bcrypt = require('bcryptjs');
var base64url = require('base64url');
var slug = require('slug');

slug.defaults.mode ='pretty';

module.exports = function() {
	var getAuthToken = function() {
		return base64url(crypto.randomBytes(70))
	}
	var CandidateSchema = new Schema({
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		local: {
			emailAddress: {
				type: String
			},
			password: {
				type: String
			}
		},
		linkedIn: {
			id: {
				type: String
			},
			token: {
				type: String
			},
			emailAddress: {
				type: String
			}
		},
		github: {
			id: {
				type: String
			},
			token: {
				type: String
			},
			emailAddress: {
				type: String
			}
		},
		google: {
			id: {
				type: String
			},
			token: {
				type: String
			},
			emailAddress: {
				type: String
			}
		},
		reviewsWritten: [{
			type: Schema.ObjectId,
			ref: 'Review'
		}],
		authToken : {
			type: 'String',
			default: getAuthToken,
			expires: '1h',
		},
		contactRequests: [{
			type: Schema.ObjectId,
			ref: 'ContactRequest'
		}],
		urlSlug: {
			type: 'String'
		},
		location: {
			type: 'String'
		},
		emailVerified: {
			type: 'Boolean',
			default: false
		},
		stack: {
			type: ['String']
		},
		compensation: {
			type: 'String'
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
		return bcrypt.compareSync(password, this.local.password);
	};

	// CandidateSchema.pre('save', function (next) {
	// 	console.log('here',this)
	// 	this.urlSlug = slug(this.userName)
	// 	next()
	// })


	return mongoose.model('Candidate', CandidateSchema)
}