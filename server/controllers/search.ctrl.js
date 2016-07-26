var mongoose = require('mongoose');
var Developer = mongoose.model('Developer')


exports.search = function(req, res) {

  console.log(req.body)

  Developer.find({
    'projects.techUsed': { $in: req.body.skills },
    compMin : { $lte: req.body.comp }
    // compType: req.body.compType
  })
  .exec(function(err, developers) {

    if(!developers) {
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
      collection: developers
    })

  })

};
