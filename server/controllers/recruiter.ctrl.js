var Recruiter = require(process.env.PWD + '/server/models/recruiter.js')();


exports.add = function() {
  var userData = req.body;
  var recruiter = new Recruiter();

  recruiter.givenName = userData.givenName;
  recruiter.familyName = userData.familyName;
  recruiter.companyPrimaryPhone = userData.companyPrimaryPhone;
  recruiter.primaryEmail = userData.primaryEmail;
  recruiter.password = userData.password;
  recruiter.companyName = userData.companyName;
  recruiter.companyAddress1 = userData.companyAddress1;
  recruiter.companyAddress2 = userData.companyAddress2;
  recruiter.companyCity = userData.companyCity;
  recruiter.companyState = userData.companyState;
  recruiter.companyZip = userData.companyZip;

  recruiter.save(function(err, recruiter) {
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

}

exports.delete = function(req, res) {

  Recruiter.findOneAndRemove({primaryEmail: req.body.email}, function(err, recruiter) {
    if(!recruiter) {
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
    res.status(403);
    return res.end();
  }

  if(err) {
    return res.status(400).send({
      success: false,
      reason: err.toString()
    })
  }

  Recruiter.findByIdAndUpdate( req.user._id, userUpdates, {new: true},
    function(err, recruiter) {
      if(err) {
        return res.status(400).send({
          success: false,
          reason: err.toString()
        })
      }

      return res.send({
        success: true,
        collection: recruiter
      })
    })

};

exports.getOne = function(req, res) {
  //TODO: only return validated records
  var query = Recruiter.findOne({primaryEmail: req.body.email},
    '-password -_id -salt -__v -va -roles -validated');

  query.exec(function(err, recruiter) {
    if(!recruiter) {
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
      collection: recruiter
    })

  })
};


exports.getById = function(req, res) {
  //TODO: only return validated records
  var query = Recruiter.findById(
    req.params.developerId,
    '-password -_id -salt -__v -va -roles -validated');

  query.exec(function(err, recruiter) {

    if(recruiter) {
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
      collection: recruiter
    })

  })
};

exports.getAll = function(req, res) {
  //TODO: only return validated records
  var query = Developer.find(
    null,
    '-password -_id -salt -__v -va -roles -validated');

  query.exec(function(err, collection) {
    if(err) throw err;
    return res.send({
      sucesss : true,
      collection: collection
    })
  })
};
























exports.getAll = function(req, res) {
  //TODO: only return validated records
  var query = Recruiter.find(
		null,
		'-password -_id -salt -__v');

	query.exec(function(err, collection) {
    if(err){
      res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }
    else {
      res.send({
        success: true,
        collection: collection
      })
    }
	})
};