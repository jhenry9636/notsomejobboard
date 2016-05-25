var Developer = require(process.env.PWD + '/server/models/developer.js')();
var bcrypt = require('bcrypt')

exports.getAll = function(req, res) {
  //TODO: only return validated records
  var query = Developer.find(
    null,
    '-password -_id -salt -__v -va -roles -validated');

  query.exec(function(err, collection) {
    if(err) throw err;
    res.send({
      sucesss : true,
      data: collection
    })
  })
};

exports.create = function(req, res) {
  var userData = req.body;
  var developer = new Developer();

  developer.givenName = userData.givenName;
  developer.familyName = userData.familyName;
  developer.zipCode = userData.zipCode;
  developer.primaryPhone = userData.primaryPhone;
  developer.primaryEmail = userData.primaryEmail;
  developer.password = userData.password;
  developer.address1 = userData.address1;
  developer.address2 = userData.address2;
  developer.technologyStack = userData.technologyStack;
  developer.locations = userData.locations;
  developer.compType = userData.compType;
  developer.compMin = userData.compMin;

  developer.save(function(err, developer) {
    if(err){
      res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }
    else {
      res.send({
        success: true
      })
    }
  })

};

exports.update = function() {

};


