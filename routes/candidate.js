var express = require('express');
var candidateRouter = express.Router();

module.exports = function(candidateCtrl) {

	candidateRouter.route('/')
		.get(candidateCtrl.get)
		.post(candidateCtrl.create)


	candidateRouter.route('/:candidateId')
		.get(candidateCtrl.getOne)
		.delete(candidateCtrl.delete)

	return candidateRouter
}
