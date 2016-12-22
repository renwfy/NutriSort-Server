var express = require('express');
var app = express();
var config = require('./config/config');

//express application settings
require('./config/express')(app);

//api
require('./routes/api')(app);

//view
require('./routes/controller')(app);

//error catch
require('./config/catch')(app);

app.listen(config.port, function () {
    console.log(process.env.NODE_ENV);
    console.log('Listening on port %d', config.port);
});

