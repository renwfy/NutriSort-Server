var qiniu = require("qiniu");
var comm = require('../../public/serverutils/common');

qiniu.conf.ACCESS_KEY = "OtjXjnLiqCa8_I4tk86ZXpBe5cOs1kebpeTJwbpH";
qiniu.conf.SECRET_KEY = "UbmlNlwnNxhfLJbS42VBCMpD9kJUHwz2TF6bDQZh";
var bucket = "nutrisort";

/***
 * 获取七牛token
 */
exports.uptoken = function (req, res, next) {
    var key = req.query.key;
    var aRes = comm.result();
    var bucketURL = bucket;
    if (key) {
        //指定上传名称
        bucketURL = bucket + ":" + key;
    }
    var putPolicy = new qiniu.rs.PutPolicy(bucketURL);
    var token = putPolicy.token();

    aRes.error = 0;
    aRes.msg = "获取token成功";
    aRes.data.token = token;
    return res.send(aRes);
};