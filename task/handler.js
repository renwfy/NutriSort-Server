var mysql = require('../public/serverutils/mysql');

exports.foodType = function () {
    var sql = "SELECT * FROM ns_foods";
    mysql.query(sql, [], function (result) {
        var data = result.data;
        if (data && data.length) {
            var i = 0;
            var async = require('async');
            async.whilst(
                function () {
                    return i < data.length;
                },
                function (callback) {
                    var info = data[i];
                    var arr = [];

                    var id = info.id;
                    var name = info.name;

                    arr.push(Number(info.carbohydrate));
                    arr.push(Number(info.protein));
                    arr.push(Number(info.fat));
                    arr = arr.sort(function(a,b){return a-b});

                    var type = "";
                    if (Number(info.carbohydrate) == arr[2]) {
                        type = "C";
                    } else if (Number(info.protein) == arr[2]) {
                        type = "P";
                    } else if (Number(info.fat) == arr[2]) {
                        type = "F";
                    }
                    // console.log(">>>>>>>>>>>>>>>>");
                    // console.log("C="+info.carbohydrate+",p="+info.protein+",f="+info.fat);
                    // console.log(arr);
                    console.log(id + " " + name + "属于" + type);

                    var sql = "UPDATE ns_foods SET type =? WHERE id =?";
                    mysql.query(sql, [type, id], function (result) {
                        if (result.error) {
                            i = i + 1;
                            callback(null, i);
                            return true;
                        } else {
                            i = i + 1;
                            callback(null, i);
                        }
                    });
                },
                function (err, n) {
                    console.log(">>>>>>>>>>>>>>>>");
                    console.log("操作成功");
                }
            );
        } else {
            console.log("没有数据");
        }
    });
}

exports.foodUnit = function () {
    var sql = "SELECT * FROM ns_foods";
    mysql.query(sql, [], function (result) {
        var data = result.data;
        if (data && data.length) {
            var i = 0;
            var async = require('async');
            async.whilst(
                function () {
                    return i < data.length;
                },
                function (callback) {
                    var info = data[i];
                    var id = info.id;
                    var name = info.name;

                    var calory = info.calory;
                    var unit = ((9000 / calory / 25).toFixed(0) * 25);
                    console.log("" + id + " " + name + ",单位份值：" + unit);

                    var sql = "UPDATE ns_foods SET unit =? WHERE id =?";
                    mysql.query(sql, [unit + "", id], function (result) {
                        if (result.error) {
                            i = i + 1;
                            callback(null, i);
                            return true;
                        } else {
                            i = i + 1;
                            callback(null, i);
                        }
                    });
                },
                function (err, n) {
                    console.log(">>>>>>>>>>>>>>>>");
                    console.log("操作成功");
                }
            );
        } else {
            console.log("没有数据");
        }
    });
}