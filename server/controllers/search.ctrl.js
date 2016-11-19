var mongoose = require('mongoose');
var Developer = mongoose.model('Developer')
var texter = require('../common/texter.js')

exports.search = function(req, res) {
  var query = {
    compMin : { $lte: req.body.comp },
    compType: req.body.compType
  }

  if(req.body.skills) {
    query['projects.techUsed'] = { $in: req.body.skills };
  }

  texter.textRequest('0').then(function(data) {
    console.log(data)
  }, function(err) {
    console.log(err)
  })


  Developer.find(query)
    // .where('locationPolyon').intersects()
    //   .geometry({ type: 'Point', coordinates: req.body.locationCoords })
    
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
