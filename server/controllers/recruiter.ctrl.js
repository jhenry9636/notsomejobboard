var Recruiter = require(process.env.PWD + '/server/models/recruiter.js')();

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
        data: collection
      })
    }
	})
};

exports.create = function(req, res) {
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



};

exports.updateUser = function(req, res) {
  var userUpdates = req.body;

  // if(req.user._id != userUpdates._id) {
  //   res.status(403);
  //   return res.end();
  // }

  req.user.firstName = userUpdates.firstName;
  req.user.lastName = userUpdates.lastName;
  req.user.username = userUpdates.username;
  if(userUpdates.password && userUpdates.password.length > 0) {
    req.user.salt = encrypt.createSalt();
    req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
  }
  req.user.save(function(err) {
    if(err) { res.status(400); return res.send({reason:err.toString()});}
    res.send(req.user);
  });
};