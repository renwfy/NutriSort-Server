var comm = require('../../config/common');
var mysql = require('../../public/javascripts/mysql');

//新增原材料
exports.create = function (req, res, next) {
    var name = req.body.name;

    var aRes = comm.result();
    var sql = "INSERT INTO ns_material (name,created_date,updated_date) VALUES (?,NOW(),NOW())";
    var param = [name];
    mysql.query(sql, param, function (result) {
        if (result.error == 0) {
            aRes.data = null;
            aRes.error = 0;
            aRes.msg = "添加成功";
        } else {
            aRes.data = null;
            aRes.error = -1;
            aRes.msg = "添加失败";
        }
        return res.send(aRes);
    });
};

//编辑
exports.edit = function (req, res) {
    var file_id = req.param('file_id');
    if (!file_id) {
        aRes.error = 1;
        aRes.msg = '请输入文件id';
        return res.send(aRes);
    }

    var sql = "DELETE FROM opple_file WHERE file_id=?";
    mysql.query(sql, [file_id], function (result) {
        return res.send(result);
    })
};

//列表
exports.list = function (req, res) {
    var aRes = comm.result();
    aRes.msg = "获取成功";
    aRes.error = 0;
    aRes.data = {};
    return res.send(aRes);
};
