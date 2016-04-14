var express = require('express');
var developerRoute = express.Router();

module.exports = function(developerCtrl) {

	developerRoute.route('/')
		.get(developerCtrl.get)
		.post(developerCtrl.create)


	developerRoute.route('/:developId')
		.get(developerCtrl.getOne)
		.delete(developerCtrl.delete)

	return developerRoute
}
