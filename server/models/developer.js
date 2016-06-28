var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('../common/validators');
var bcrypt = require('bcrypt');
var faker = require('faker');


var developerSchema;
developerSchema = new Schema({
  givenName: {
    type: String,
    required: [true, 'First name field is required.'],
    validate: validator.requiredField
  },
  familyName: {
    type: String,
    required: [true, 'Last name field is required.'],
    validate: validator.requiredField
  },
  primaryEmail: {
    type: String,
    required: [true, 'Email address field is required.'],
    validate: validator.emailAddress,
    index: {unique: true}
  },
  password: {
    type: String,
    required: [true, 'Password field is required.'],
    validate: validator.password
  },
  tech: {
    type: [String],
    required: [true, 'Technologies field is required.'],
    validate: validator.requiredField
  },
  compType: {
    type: String,
    enum: validator.compType
  },
  compMin: {
    type: String
  },
  primaryPhone: String,
  receivedContactRequests: [{
    type: Schema.ObjectId,
    ref: 'Request',
    validate: validator.isObjectId
  }],
  hasVerifiedEmail: {
    default: false,
    type: Boolean
  },
  location: {
    type: [Number],
    required: true
  },
  salt: String,
  joinedAt: {
    type: Date,
    default: Date.now
  },
  isDeveloper: {
    type: Boolean,
    default: true
  },
  roles: [String]
});

developerSchema.index({location: '2dsphere'});

developerSchema.pre('save', function(next) {
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

developerSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

developerSchema.methods.hasRole = function(role) {
  return this.roles.indexOf(role) > -1;
}

developerSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    delete ret.isDeveloper;
    delete ret.salt;
    delete ret.__v;
    delete ret.roles;
    delete ret.hasVerifiedEmail;

    return ret
  }
})


// specify the transform schema option
if (!developerSchema.options.toObject) developerSchema.options.toObject = {};
developerSchema.options.toObject.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret._id;
  delete ret.password;
  delete ret.isDeveloper;
  delete ret.salt;
  delete ret.hasVerifiedEmail;
}



mongoose.model('Developer', developerSchema)

exports = function() {


}