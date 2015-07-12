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
			type: 'String',
			require: true
		},
		lastName: {
			type: 'String',
			require: true
		},
		userName: {
			type: 'String',
			require: true		
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
		urlSlug: {
			type: 'String'
		},
		location: {
			type: 'String',
			require: true
		},
		emailVerified: {
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

	CandidateSchema.pre('save', function(next) {
		var candidate = this;

		if (!candidate.isModified('password')) return next();

		bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(candidate.password, salt, function(err, hash) {
			if (err) return next(err);
				candidate.password = hash;
				next();
			});
		});
	});


	CandidateSchema.pre('save', function (next) {
		this.urlSlug = slug(this.userName)
		next()
	})

	CandidateSchema.methods.comparePassword = function(candidatePassword) {
		return bcrypt.compareSync(candidatePassword, this.password)
	};

	return mongoose.model('Candidate', CandidateSchema)
}