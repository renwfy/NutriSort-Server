/**
 * Created by LSD on 2017/4/10.
 */
var http = require("../public/serverutils/serverHttp");
var mysql = require('../public/serverutils/mysql');

var lastpage = 0;
var categoryId = 1;
var categoryNames = ["主食类", "肉蛋类", "大豆及制品", "蔬菜菌藻类", "水果类", "奶类", "油脂类", "坚果类", "调味品", "饮料类", "零食，点心及冷饮", "其它"];
var categoryName = "";


(function () {
    //reptileCategory();
    //reptileDeatails();
    //downloadImage();
})();


function reptileCategory() {
    categoryName = categoryNames[categoryId - 1];
    console.log("\n抓取分类-->：  " + categoryName + "   ==========================================");
    reptileFoods();
}


function reptileFoods() {
    var url = "http://food.boohee.com/fb/v1/foods";
    var pamas = {"value": categoryId, "kind": "group", "page": lastpage + 1};
    console.log("准备抓取分类（" + categoryName + "）第 " + (lastpage + 1) + " 页");
    http.SERVER_GET(url, pamas, function (res) {
        if (lastpage == res.page) {
            console.log("page=" + res.page);
            console.log("分类抓取完成，共" + res.page + "页，准备抓取下一个分类");
            categoryId += 1;
            if (categoryId >= 13) {
                console.log("全部抓取完成");
            } else {
                lastpage = 0;
                reptileCategory();
            }
            return;
        }
        var foods = res.foods;

        var async = require('async');
        var i = 0;
        async.whilst(
            function () {
                return i < foods.length;
            },
            function (cb) {
                var food = foods[i];
                console.log(food.name);
                var thumbImage = food.thumb_image_url;
                var re = new RegExp("mid", "g");
                var lagerImage;
                if (thumbImage) {
                    lagerImage = thumbImage.replace(re, "big");
                    lagerImage = lagerImage.substr(0, 43) + lagerImage.substr(44, lagerImage.length);
                }

                var sql = "INSERT INTO ns_foods (name,code,thumbImage,lagerImage,categoryId,categoryName,calory,fat,protein,fiber_dietary,carbohydrate," +
                    "vitamin_a,vitamin_c,vitamin_e,thiamine,lactoflavin,niacin,natrium,calcium,iron,kalium,iodine,zinc,selenium,magnesium,copper,manganese," +
                    "cholesterol,createdDate,updatedDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())";
                var param = [food.name, food.code, thumbImage, lagerImage, categoryId, categoryName, food.calory, food.fat, food.protein, food.fiber_dietary,
                    food.carbohydrate, food.vitamin_a, food.vitamin_c, food.vitamin_e, food.thiamine, food.lactoflavin, food.niacin, food.natrium, food.calcium,
                    food.iron, food.kalium, food.iodine, food.zinc, food.selenium, food.magnesium, food.copper, food.manganese, food.cholesterol];
                mysql.query(sql, param, function (result) {
                    if (result.error == 0) {
                        i = i + 1;
                        cb(null, i);
                    } else {
                        console.log("写入失败");
                        return;
                    }
                });
            },
            function (err, n) {
                if (err) {
                    console.log("抓取失败");
                } else {
                    lastpage += 1;
                    setTimeout(function () {
                        reptileFoods();
                    }, 500);
                }
            }
        )
    });
}


function reptileDeatails() {
    var sql = "SELECT code,name FROM ns_foods";
    var param = [];
    mysql.query(sql, param, function (result) {
        if (result.error == 0) {
            var foods = result.data;

            var async = require('async');
            var i = 0;
            async.whilst(
                function () {
                    return i < foods.length;
                },
                function (cb) {
                    var food = foods[i];
                    var code = food.code;
                    var name = food.name;

                    console.log("更新 " + name + "");
                    var url = "http://food.boohee.com/fb/v1/foods/" + code + "/mode_show";
                    var pamas = {};
                    http.SERVER_GET(url, pamas, function (res) {
                        var ingredient = res.ingredient;
                        var sql = "UPDATE  ns_foods SET lagerImage=?,gi=?,gl=?,carotene=?,phosphor=? WHERE code=?";
                        var param = [res.large_image_url, res.gi, res.gl, ingredient.carotene, ingredient.phosphor, code];
                        mysql.query(sql, param, function (result) {
                            if (result.error == 0) {
                                i = i + 1;
                                cb(null, i);
                            } else {
                                console.log("写入失败");
                                return;
                            }
                        });
                    });
                },
                function (err, n) {
                    if (err) {
                        console.log("更新失败");
                    } else {
                        console.log("更新完成");
                    }
                }
            )
        } else {
            console.log("查询失败");
            return;
        }
    });
}


function downloadImage() {
    var sql = "SELECT code,lagerImage FROM ns_foods";
    var param = [];
    mysql.query(sql, param, function (result) {
        var foods = result.data;

        var async = require('async');
        var i = 0;
        async.whilst(
            function () {
                return i < foods.length;
            },
            function (cb) {
                var url = foods[i].lagerImage;
                var code = foods[i].code;
                if(url){
                    var name = url.substr((url.lastIndexOf("/")+1));
                    var path = "../public/download/"+name;
                    http.DOWNLOAD(url,path,function (result) {
                        http.UPLOAD(name,path,function (url) {
                            var sql = "UPDATE  ns_foods SET lagerImage=? WHERE code=?";
                            var param = [url, code];
                            mysql.query(sql, param, function (result) {
                                if (result.error == 0) {
                                    console.log("更新成功: "+code);
                                    i = i + 1;
                                    cb(null, i);
                                } else {
                                    console.log("写入失败");
                                    return;
                                }
                            });
                        });
                    });
                }else{
                    i = i + 1;
                    cb(null, i);
                }
            },
            function (err, n) {
                if (err) {
                    console.log("更新失败");
                } else {
                    console.log("更新完成");
                }
            }
        )
    });
}