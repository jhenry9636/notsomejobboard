var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('../common/validators');

var projectSchema = new Schema({
  developer: {
    type : Schema.ObjectId,
    ref : 'Developer',
    required: true
  },
  name: {
    type: String,
    require: true,
    enum: validator.requiredField
  },
  client: {
    type: String,
    require: true,
    validate: validator.requiredField
  },
  url: {
    type: String,
    require: true,
    validate: validator.requiredField
  },
  description: {
    type: String,
    require: true,
    validate: validator.requiredField
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

return mongoose.model('Project', projectSchema)