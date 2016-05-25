var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var server = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(server, config);


require('./server/config/mongoose')(config);

require('./server/config/views')(server);


require('./server/routes/developer')(server);
require('./server/routes/recruiter')(server);


require('./server/routes/signup')(server);


server.listen(config.port);
console.log('Listening on port ' + config.port + '...');


