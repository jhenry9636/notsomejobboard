var express = require('express');
var recruiterRouter = express.Router();


module.exports = function(recruiterCtrl) {

	recruiterRouter.route('/')
		.get(recruiterCtrl.get)
		.post(recruiterCtrl.create)


	recruiterRouter.route('/:recruiterId')
		.get(recruiterCtrl.getOne)
		.delete(recruiterCtrl.delete)
	return recruiterRouter
}

