var utils = require('./utils');

exports.getParams = function (req) {
    var params = req.query; //URLParams
    params.vID = utils.isset(req.query._v) ? req.query._v : 0;//客户端版本号
    params.uID = utils.isset(req.query._u) ? req.query._u : 0;//用户userId
    params.oID = utils.isset(req.query._o) ? req.query._o : 0;//客户端代号 1：IOS , 2：Android
    return params;
}

/***
 * sql操作数据库拼装
 *
 * @param req
 * @param sql
 * @param param
 * @param callback
 */
exports.sqlParams = function (req, sql, param, callback) {
    var params = req.body //POST Params
    for (key in params) {
        //是否有值
        if (params.hasOwnProperty(key)) {
            sql += "" + key + "=?,"
            param.push(params[key])
        }
    }
    sql = sql.substr(0,sql.length-1);
    callback(sql, param)
}