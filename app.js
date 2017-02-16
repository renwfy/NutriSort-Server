var express = require('express');
var app = express();
var config = require('./server/config');

//express application settings
require('./server/express')(app);

//api
require('./routes/api')(app);

//view
require('./routes/controller')(app);

//error catch
require('./server/catch')(app);

var port = process.env.PORT || config.port;
app.listen(port, function () {
    console.log(process.env.NODE_ENV);
    console.log('Listening on port %d', port);
});

