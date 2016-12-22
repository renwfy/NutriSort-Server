/**
 * Created by LSD on 16/7/2.
 */
var API_NO_ERROR = 0;

exports.result = function () {
    var result = {};
    result.error = API_NO_ERROR;
    result.msg = 'SUCCESS';
    result.data = {};
    return result;
}
