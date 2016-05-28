var express = require('express');
var logoutRouter = express.Router();

module.exports = function() {

  logoutRouter.route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/');
    })

  return logoutRouter
}