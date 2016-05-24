var Developer = require(process.env.PWD + '/server/models/developer.js')();
var encrypt = require('../common/encryption');


exports.getAll = function(req, res) {
  var query = Developer.find();

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

  console.log(userData)

  developer.givenName = userData.firstName;
  developer.familyName = userData.lastName;
  developer.zipCode = userData.zipCode;
  developer.primaryPhone = userData.primaryPhone;
  developer.primaryEmail = userData.primaryEmail;
  developer.salt = encrypt.createSalt();
  developer.password = encrypt.hashPwd(developer.salt, userData.password);
  developer.address1 = userData.address1;
  developer.address2 = userData.address2;
  developer.technologyStack = userData.stack;
  developer.locations = userData.locations;
  developer.compensationType = userData.compType;
  developer.compensationMin = userData.compensationMin;

  developer.save(function(err, developer) {
    if(err) throw err;
    console.log('User saved ::')
    console.dir(developer)
  })



};

exports.update = function() {

};


