// configuration file
var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

var config = {
    root: rootPath,
    port: 3002,
    isProduction: false,
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'nutrisort',
        dateStrings: true
    }
};

if ('production' == process.env.NODE_ENV) {
    config.mysql.host = 'localhost';
    config.mysql.user = 'family';
    config.mysql.password = 'fp123456';
    config.database = 'nutrisort';
    config.isProduction = true;
}

module.exports = config;