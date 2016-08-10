var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('../common/validators');
var bcrypt = require('bcrypt');
var beautifyUnique = require('mongoose-beautiful-unique-validation');
var randtoken = require('rand-token');


var tokenSchema = Schema({
  developer: {
    type : Schema.ObjectId,
    ref : 'Developer'
  },
  recruiter: {
    type : Schema.ObjectId,
    ref : 'Recruiter'
  },
  email: {
    type: String,
  },
  value: {
    type: String,
    validate: validator.requiredField,
    require: true
  },
  expireAt: {
    type: Date,
    expires: 600,
    default: Date.now
  }
})

tokenSchema.methods.generateToken = function(email) {
  this.email = email;
  this.value = randtoken.generate(40);
  return this.value;
};

tokenSchema.plugin(beautifyUnique);

mongoose.model('Token', tokenSchema)