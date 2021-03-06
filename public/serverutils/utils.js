/**
 * Created by LSD on 2016/12/30.
 */

exports.ifFloatNull = function(value) {
    if (!value) {
        return 0;
    }
    if (value.replace(/(^s*)|(s*$)/g, "").length == 0) {
        return 0;
    }
    return value;
}

//判断值是否存在
exports.isset = function(value) {
    if (typeof(value) == "undefined") {
        return false;
    }
    return true;
}