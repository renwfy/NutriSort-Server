var comm = require('../../public/serverutils/common');
var funUtil = require('../../public/serverutils/funUtils');
var mysql = require('../../public/serverutils/mysql');

//新增原材料
exports.food = function (req, res, next) {
    var id = req.body.id;

    var aRes = comm.result()
    var sql = ""
    var param = []
    if (id) {
        sql = "UPDATE ns_foods SET "
    } else {
        sql = "INSERT INTO ns_foods SET "
    }
    funUtil.sqlParams(req, sql, param, function (ssql, sparam) {
        if (id) {
            ssql += " WHERE id=?"
            sparam.push(id)
        }
        mysql.query(ssql, sparam, function (result) {
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
        })
    })
}

//列表
exports.list = function (req, res) {
    var start = req.query.start;
    var size = req.query.size;

    var aRes = comm.result();

    var sql = "SELECT COUNT(*) AS CNT FROM ns_foods";
    var param = [];
    mysql.query(sql, param, function (result) {
        var cnt = result.data[0].CNT;
        if (cnt == 0) {
            aRes.data.list = null;
            aRes.data.count = 0;
            aRes.error = 0;
            aRes.msg = "没有数据";
            return res.send(aRes);
        }
        var sql = "SELECT id,name,code,type,type2,unit,lagerImage,intro,gi FROM ns_foods WHERE isActive=1 AND type is NULL AND type2 IS NULL";
        var param = [];
        if (start && size) {
            //分页
            if (start <= 1) start = 1;
            start = start - 1;
            if (size == 0) size = 10;
            sql += " LIMIT ?,?";
            param.push(start * 1);
            param.push(size * 1);
        }
        mysql.query(sql, param, function (result) {
            if (result.error == 0) {
                aRes.data.list = result.data;
                aRes.data.count = cnt;
                aRes.error = 0;
                aRes.msg = "获取成功";
            } else {
                aRes.data = null;
                aRes.error = -1;
                aRes.msg = "获取列表失败";
            }
            return res.send(aRes);
        });
    });
};

//详情
exports.details = function (req, res) {
    var foodId = req.query.foodId;

    var aRes = comm.result();

    var sql = "SELECT * FROM ns_foods ma WHERE isActive=1 AND id=?";
    var param = [foodId];
    mysql.query(sql, param, function (result) {
        if (result.error == 0) {
            aRes.data = result.data[0];
            aRes.error = 0;
            aRes.msg = "获取成功";
        } else {
            aRes.data = {};
            aRes.error = -1;
            aRes.msg = "获取列表失败";
        }
        return res.send(aRes);
    });
}

//app首页热门列表
exports.hotList = function (req, res) {
    var aRes = comm.result();
    var data = [];

    var sql = "SELECT fd.categoryId,fd.categoryName,cr.imageUrl FROM ns_foods fd LEFT JOIN ns_category cr ON fd.categoryId=cr.id WHERE cr.isActive=1  GROUP BY categoryId ";
    var param = [];
    mysql.query(sql, param, function (result) {
        var group = result.data;
        if(!result.data){
            aRes.data = {};
            aRes.error = -1;
            aRes.msg = "获取列表失败";
            return res.send(aRes);
        }
        var async = require('async');
        var i = 0;
        async.whilst(
            function () {
                return i < group.length;
            },
            function (cb) {
                var category = group[i];
                var sql = 'SELECT id,name,code,type,lagerImage FROM ns_foods WHERE categoryId=? AND isActive=1  ORDER BY updatedDate limit 0,10';
                var param = [category.categoryId];
                mysql.query(sql, param, function (result) {
                    var hotItem = {};
                    hotItem.categoryId = category.categoryId;
                    hotItem.categoryName = category.categoryName;
                    hotItem.imageUrl = category.imageUrl;
                    hotItem.list = result.data;
                    data.push(hotItem);

                    i = i + 1;
                    cb(null, i);
                });
            },
            function (err, n) {
                if (err) {
                    aRes.data = {};
                    aRes.error = -1;
                    aRes.msg = "获取列表失败";
                    return res.send(aRes);
                } else {
                    aRes.data = data;
                    return res.send(aRes);
                }
            }
        );
    });
}
