/**
 * Created by LSD on 2016/12/30.
 */

exports.ifFloatNull = function(value) {
    if (!value) {
        return 0;
    }
    if (string.replace(/(^s*)|(s*$)/g, "").length == 0) {
        return 0;
    }
    return value;
}