var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var expressSession = require('express-session');
var passport = require('passport');
var logger = require('morgan');
var stylus = require('stylus');
var flash = require('express-flash');

module.exports = function(server, config) {
  function compile(str, path) {
    return stylus(str).set('filename', path);
  }

  server.use(bodyParser.urlencoded({
    extended: true
  }));
  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use(expressSession({
    secret: 'dean milton',
    resave: false,
    saveUninitialized: false
  }));

  server.use(flash());

  server.use(logger('dev'));
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(stylus.middleware(
    {
      src: config.rootPath + '/public',
      compile: compile
    }
  ));
  server.use(express.static(config.rootPath + '/public'));

}
