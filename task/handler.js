var mysql = require('../public/serverutils/mysql');

//食物分类
exports.foodType = function () {
    var sql = "SELECT * FROM ns_foods where isActive=1";
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
                    arr = arr.sort(function (a, b) {
                        return a - b
                    });

                    var type = "";
                    if (Number(info.carbohydrate) == arr[2]) {
                        type = "C";
                    } else if (Number(info.protein) == arr[2]) {
                        type = "P";
                    } else if (Number(info.fat) == arr[2]) {
                        type = "F";
                    }
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

//单位份
exports.foodUnit = function () {
    var sql = "SELECT * FROM ns_foods where isActive=1 and calory !=0 and calory !='' ";
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
                    var unit = 0;
                    try {
                        unit = ((9000 / calory / 10).toFixed(0) * 10);
                    } catch (e) {
                    }
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

//ci
exports.Ci = function () {
    var sql = "SELECT * FROM ns_foods where isActive=1";
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

                    var carbohydrate = info.carbohydrate;
                    var unit = info.unit;
                    var ci = (unit / 100 * carbohydrate).toFixed(1);
                    console.log("" + id + " " + name + ",ci：" + ci);
                    var sql = "UPDATE ns_foods SET ci =? WHERE id =?";
                    mysql.query(sql, [ci, id], function (result) {
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

//pi
exports.Pi = function () {
    var sql = "SELECT * FROM ns_foods where isActive=1";
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

                    var protein = info.protein;
                    var unit = info.unit;
                    var pi = (unit / 100 * protein).toFixed(1);
                    console.log("" + id + " " + name + ",pi：" + pi);
                    var sql = "UPDATE ns_foods SET pi =? WHERE id =?";
                    mysql.query(sql, [pi, id], function (result) {
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

//fi
exports.Fi = function () {
    var sql = "SELECT * FROM ns_foods where isActive=1";
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

                    var fat = info.fat;
                    var unit = info.unit;
                    var fi = (unit / 100 * fat).toFixed(1);
                    console.log("" + id + " " + name + ",fi：" + fi);
                    var sql = "UPDATE ns_foods SET fi =? WHERE id =?";
                    mysql.query(sql, [fi, id], function (result) {
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

//Ci百分比
exports.foodCiPercent = function () {
    var sql = "SELECT * FROM ns_foods where isActive!=0";
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

                    var ci = info.ci;
                    if (!ci) {
                        ci = 0;
                    }
                    var ciPercent = ((ci * 4 / 90 * 100).toFixed(0)) + "";
                    console.log("" + id + " " + name + ",百分比：" + ciPercent);
                    var sql = "UPDATE ns_foods SET ciPercent=? WHERE id =?";
                    mysql.query(sql, [ciPercent, id], function (result) {
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

//Pi百分比
exports.foodPiPercent = function () {
    var sql = "SELECT * FROM ns_foods where isActive!=0";
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

                    var pi = info.pi;
                    if (!pi) {
                        pi = 0;
                    }
                    var piPercent = ((pi * 4 / 90 * 100).toFixed(0)) + "";
                    console.log("" + id + " " + name + ",百分比：" + piPercent);
                    var sql = "UPDATE ns_foods SET piPercent=? WHERE id =?";
                    mysql.query(sql, [piPercent, id], function (result) {
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

//Fi百分比
exports.foodFiPercent = function () {
    var sql = "SELECT * FROM ns_foods where isActive!=0";
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

                    var fi = info.fi;
                    if (!fi) {
                        fi = 0;
                    }
                    var fiPercent = ((fi * 9 / 90 * 100).toFixed(0)) + "";
                    console.log("" + id + " " + name + ",百分比：" + fiPercent);
                    var sql = "UPDATE ns_foods SET fiPercent=? WHERE id =?";
                    mysql.query(sql, [fiPercent, id], function (result) {
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

//水平含量
exports.foodMoisture = function () {
    var sql = "SELECT * FROM ns_foods where isActive!=0";
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

                    var carbohydrate = info.carbohydrate;
                    if (!carbohydrate) {
                        carbohydrate = 0;
                    }

                    var fat = info.fat;
                    if (!fat) {
                        fat = 0;
                    }

                    var protein = info.protein;
                    if (!protein) {
                        protein = 0;
                    }
                    var moisture = ((100 - carbohydrate - fat - protein)).toFixed(0);
                    if (moisture <= 0) {
                        moisture = 0;
                    }
                    console.log("" + id + " " + name + ",水份：" + moisture);
                    var sql = "UPDATE ns_foods SET moisture=? WHERE id =?";
                    mysql.query(sql, [moisture, id], function (result) {
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