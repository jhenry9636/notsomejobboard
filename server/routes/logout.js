var express = require('express');
var logoutRouter = express.Router();

module.exports = function() {

  logoutRouter.route('/logout')
    .post(function(req, res) {
      req.logout();
      res.redirect('/');
    })

  return logoutRouter
}