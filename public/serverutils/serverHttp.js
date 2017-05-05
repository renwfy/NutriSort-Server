var superagent = require('superagent');
var request = require('request');
var fs = require('fs');
var qiniu = require("qiniu");

/**
 * 服务端调用get方法
 *
 * @param url
 * @param pamas
 * @param callback
 */
exports.SERVER_GET = function (url, pamas, callback) {
    superagent
        .get(url)
        .query(pamas)
        .end(function (err, res) {
            if (200 == res.status) {
                callback(res.body);
            } else {
                console.log(err);
            }
        })
}


/***
 * 服务端调用post方法
 *
 * @param url
 * @param pamas
 * @param callback
 * @constructor
 */
exports.SERVER_POST = function (url, pamas, callback) {
    superagent
        .post(url)
        .send(pamas)
        .end(function (err, res) {
            if (200 == res.status) {
                callback(res.body);
            } else {
                console.log(err);
            }
        })
}

/***
 * 下载文件
 *
 * @param url
 * @param path
 * @param callback
 * @constructor
 */
exports.DOWNLOAD = function (url, path, callback) {
    var stream = fs.createWriteStream(path);
    request(url).pipe(stream).on('close', function () {
        callback(path);
    });
}


/***
 * 上传到七牛
 *
 * @param path
 * @param callback
 * @constructor
 */
exports.UPLOAD = function (key, path, callback) {
    qiniu.conf.ACCESS_KEY = 'OtjXjnLiqCa8_I4tk86ZXpBe5cOs1kebpeTJwbpH';
    qiniu.conf.SECRET_KEY = 'UbmlNlwnNxhfLJbS42VBCMpD9kJUHwz2TF6bDQZh';

    var token = uptoken('nutrisort', key);
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token, key, path, extra, function (err, ret) {
        if (!err) {
            // 上传成功， 处理返回值
            var linkUrl = "http://oivzpz56a.bkt.clouddn.com/" + ret.key;
            callback(linkUrl);
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
        }
    });
}

function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
}