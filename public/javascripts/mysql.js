var config = require('../../config/config');
var mysql = require('mysql');

// get mysql connection
var pool = null;
if (pool == null) {
    pool = mysql.createPool(config.mysql);
}

exports.query = function (sql, param, callback) {
    var result = {error: 0, msg: '操作成功', data: Array()};
    pool.getConnection(function (err, conn) {
        if (err) {
            result.error = 1;
            result.msg = err;
        }
        conn.query(sql, param, function (err, rows, fields) {
            if (err) {
                console.log(err.message)
                result.error = 1;
                result.msg = err.message;
            }
            result.data = rows;
            // result.fields = fields;
            conn.release();
            callback(result);
        });
    });
}

