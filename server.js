var express = require('express');
var session = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var flash = require('connect-flash');
var path = require('path');
var http = require('http');
var https = require('https');
var fs = require('fs');

var server = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var expressHandlebars  = require('express-handlebars');

var CandidateModel = require(process.env.PWD + '/server/models/developer.model.js')();
var RecruiterModel = require(process.env.PWD + '/server/models/recruiter.model.js')();
var ReviewModel = require(process.env.PWD + '/server/models/review.model.js')();
var ContactModel = require(process.env.PWD + '/server/models/contact.model.js')();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

process.env.PWD = process.cwd();

server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
server.use(expressSession({
	secret: 'dean milton',
	resave: false,
	saveUninitialized: false
}));

server.use(flash());
server.use(express.static(path.join(process.env.PWD, '/public')));
var authenticationCheck = require(process.env.PWD + '/server/common/authcheck.js');

require(process.env.PWD + '/server/config/mongoose.config.js')()
require(process.env.PWD + '/server/config/passport.config.js')(server, CandidateModel, RecruiterModel, nodeMailer)
require(process.env.PWD + '/server/config/views.config.js')(server, expressHandlebars, path)

var port = process.env.PORT || 8080;

var httpServer = http.createServer(server);

httpServer.listen(port, function(err){
    if(err) throw err
    console.log("server running at https: " + port)
});


