var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('../common/validators');

var requestSchema = new Schema({
  recipient: {
    type : Schema.ObjectId,
    ref : 'Developer',
    required: true
  },
  sender: {
    type : Schema.ObjectId,
    ref : 'Recruiter',
    require: true
  },
  location: {
    type: Schema.ObjectId,
    ref: 'Location',
    require: true
  },
  compType: {
    type: String,
    require: true,
    enum: validator.compType
  },
  compMax: {
    type: String,
    require: true,
    validate: validator.requiredField
  },
  technologies: {
    type: String,
    require: true,
    validate: validator.requiredField
  },
  clientName: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

return mongoose.model('Request', requestSchema)

module.exports = function() {


}