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
		emailAddress: {
			type: String,
			require: true
		},
		password: {
			type: String,
			require: true
		},
		joinedDate: {
			type: Date,
			default : Date.now()
		},
		companyName: {
			type: String,
			default: null
		},
		isRecruiter: {
			type: 'Boolean',
			default: true
		},
		urlSlug: {
			type: 'String'
		}

	})

	RecruiterSchema.pre('save', function(next) {
		var recruiter = this;

		if (!recruiter.isModified('password')) return next();

		bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(recruiter.password, salt, function(err, hash) {
			if (err) return next(err);
				recruiter.password = hash;
				next();
			});
		});
	});


	RecruiterSchema.pre('save', function (next) {
		this.urlSlug = slug(this.userName)
		next()
	})

	RecruiterSchema.methods.comparePassword = function(recruiterPassword) {
		return bcrypt.compareSync(recruiterPassword, this.password)
	};

	return mongoose.model('Recruiter', RecruiterSchema)

}
