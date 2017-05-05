var express = require('express');
var config = require('./config');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');

module.exports = function (app) {
    // view engine setup
    app.set('views', config.root + '/views');
    app.set('view engine', 'html');
    swig.setDefaults({ varControls: ['{$', '$}'] });
    app.engine('html', swig.renderFile);

    //app.use(logger('dev'));
    if('production' == process.env.NODE_ENV){
        //app.use(logger('pro'));
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(config.root + '/public'));
};