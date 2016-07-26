var mongoose = require('mongoose');
var Developer = mongoose.model('Developer')
var bcrypt = require('bcrypt')


exports.add = function(req, res) {
  console.dir(req.body)
  var userData = req.body;
  var developer = new Developer();

  console.log('*************************************************************'
    + 'this is the userData *************************************************************')

  console.dir(userData.locationPolygon)


  developer.givenName = userData.givenName;
  developer.familyName = userData.familyName;
  developer.primaryPhone = userData.primaryPhone;
  developer.primaryEmail = userData.primaryEmail;
  developer.password = userData.password;
  developer.projects = userData.projects;
  developer.locationName = userData.locationName;
  developer.locationRadius = userData.locationRadius;
  developer.locationCoords = userData.locationCoords;
  developer.locationPolygon = userData.locationPolygon;
  developer.compType = userData.compType;
  developer.compMin = userData.compMin;

  developer.save(function(err, developer) {
    console.dir(developer)
    if(err) {
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }
    return res.send({
      success: true,
      collection: developer
    })

  })
};


exports.findByLatLng = function(req, res) {
  
};

exports.delete = function(req, res) {

  Developer.findOneAndRemove({primaryEmail: req.body.email}, function(err, developer) {
    if(!developer) {
      return res.status(404).send({
        success: false,
        reason: new Error('User not found')
      })
    }

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


exports.update = function(req, res) {
  var userUpdates = req.body;

  if(req.user._id != userUpdates._id) {
    return res.status(403).end();
  }

  if(err) {
    return res.status(400).send({
      success: false,
      reason: err.toString()
    })
  }

  req.user.givenName = userData.givenName;
  req.user.familyName = userData.familyName;
  req.user.zipCode = userData.zipCode;
  req.user.primaryPhone = userData.primaryPhone;
  req.user.primaryEmail = userData.primaryEmail;
  req.user.password = userData.password;
  req.user.address1 = userData.address1;
  req.user.address2 = userData.address2;
  req.user.technologyStack = userData.technologyStack;
  req.user.locations = userData.locations;
  req.user.compType = userData.compType;
  req.user.compMin = userData.compMin;


  req.user.save(function(err) {
    if(err) {
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    return res.send({
      success: true,
      collection: req.user
    })

  })
};

exports.getOne = function(req, res) {
  //TODO: only return validated records
  var query = Developer.findOne({primaryEmail: req.body.primaryEmail});

  query.exec(function(err, developer) {
    if(developer) {
      return res.status(400).send({
        success: false,
        reason: new Error('User not found')
      })
    }

    if(err) {
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    return res.send({
      success: true,
      collection: developer
    })

  })
};


exports.getById = function(req, res) {
  //TODO: only return validated records
  console.log(req.params.developerId)

  Developer.findById(req.params.developerId,
    function(err, developer) {

    if(!developer) {
      return res.status(404).send({
        success: false,
        reason: new Error('User not found')
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
      collection: developer
    })

  })
};

exports.getAll = function(req, res) {
  //TODO: only return validated records
  var query = Developer.find();

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










