var utils = require('./utils');

exports.getPamas = function (req) {
    var pamas = {};
    pamas.vID = utils.isset(req.query._v) ? req.query._v : 0;//客户端版本号
    pamas.uID = utils.isset(req.query._u) ? req.query._u : 0;//用户userId
    pamas.oID = utils.isset(req.query._o) ? req.query._o : 0;//客户端代号 1：IOS , 2：Android
    return pamas;
}