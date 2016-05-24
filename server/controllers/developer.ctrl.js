var DeveloperModel = require(process.env.PWD + '/server/models/developer.js')();



module.exports.getAll = function(req, res) {

  // var query = DeveloperModel.find();
  //
  // query.exec(function(err, collection) {
  //   if(err) throw err;
  //   res.send({
  //     sucesss : true,
  //     data: collection
  //   })
  // })
};

module.exports.create = function(req, res) {

  var developer = new DeveloperModel();




};

module.exports.update = function() {

};


