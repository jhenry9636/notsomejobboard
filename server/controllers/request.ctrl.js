var mongoose = require('mongoose');
var Request = mongoose.model('Request')


exports.add = function(req, res) {
  var userData = req.body;
  var request = new Request();

  request.recipient = userData.recipient;
  //TODO: Set request.sender back to req.user._id
  request.sender = userData.sender;
  //request.sender = req.user._id;
  request.location = userData.location;
  request.compType = userData.compType;
  request.compMax = userData.compMax;
  request.technologies = userData.technologies;

  console.log(request)
  request.save(function(err, request) {
    if(err) {
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    return res.send({
      success: true
    })

  })
};


exports.delete = function(req, res) {

  Request.findByIdAndRemove(req.body.id, function(err) {
    if(err) {
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    return res.send({
      success: true
    })

  })
};

exports.getByDeveloperId = function(req, res) {
  //TODO: only return validated records
  var query = Request.find(
    {recipient: req.params.developerId},
    '-__v');

  query.populate('recipient')
  query.exec(function(err, request) {

    if(request) {
      return res.status(404).send({
        success: false,
        reason: new Error('Request not found')
      })
    }

    if(err){
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    return res.send({
      success: true,
      collection: request
    })

  })
};

exports.getByRecruiterId = function(req, res) {
  //TODO: only return validated records
  var query = Request.find(
    {sender: req.params.recruiterId},
    '-__v');

  query.populate('recipient')
  query.exec(function(err, request) {

    if(request) {
      return res.status(404).send({
        success: false,
        reason: new Error('Request not found')
      })
    }

    if(err){
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    return res.send({
      success: true,
      collection: request
    })

  })
};

exports.getAll = function(req, res) {
  //TODO: Make sure all get all routes have authorization
  //TODO: only return validated records
  var query = Request.find(
    null,
    '-__v');

  query.populate('recipient')
  query.populate('sender')
  query.sort({createdAt: 'desc'})
  query.exec(function(err, collection) {
    if(err){
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    return res.send({
      success: true,
      collection: collection
    })
  })
};