/**
 * Created by LSD on 16/8/5.
 */
TopClient = require('./topClient').TopClient;
var comm = require('../../config/common');
var mysql = require('../../utils/mysql');
var moment = require('moment');

var client = new TopClient({
    'appkey': '23425639',
    'appsecret': '619837b29d4f04554204a58947d5e788',
    'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

/***
 * 发送验证码
 * @param phone
 * @param code
 * @param res
 */
exports.sendCode = function (phone, code, res) {
    var sSign = '饭米粒测试';

    var aRes = comm.result();
    var params = "{'number':'" + code + "'}";
    client.execute('alibaba.aliqin.fc.sms.num.send', {
        'extend': phone,
        'sms_type': 'normal',
        'sms_free_sign_name': sSign,
        'sms_param': params,
        'rec_num': phone,
        'sms_template_code': 'SMS_12985240'
    }, function (error, response) {
        if (!error) {
            console.log(response);
            //保存验证码
            var sql = "INSERT INTO fm_sms (phone,vcode,created_date,updated_date) VALUES (?,?,NOW(),NOW())";
            mysql.query(sql, [phone, code], function (result) {
                //console.log(result)
            });
            aRes.msg = "获取验证码成功";
            return res.send(aRes);
        } else {
            console.log(error)
            aRes.error = 1;
            var sub_code = error.sub_code;
            if (sub_code == 'isv.BUSINESS_LIMIT_CONTROL') {
                aRes.msg = "请求验证码过于频繁,请1分钟后再试";
            } else if (sub_code == 'isv.MOBILE_NUMBER_ILLEGAL') {
                aRes.msg = "手机号不正确";
            } else {
                aRes.msg = "获取验证码失败,请稍后再试";
            }
            return res.send(aRes);
        }
    });
}

exports.sendMsg = function (phone, u_name,u_phone,content,callback) {
    var sSign = '饭米粒测试';

    var aRes = comm.result();
    var params = "{'u_name':'" + u_name + "','content':'" + content + "','u_phone':'" + u_phone + "'}";
    client.execute('alibaba.aliqin.fc.sms.num.send', {
        'extend': phone,
        'sms_type': 'normal',
        'sms_free_sign_name': sSign,
        'sms_param': params,
        'rec_num': phone,
        'sms_template_code': 'SMS_15385330'
    }, function (error, response) {
        if (!error) {
            console.log(response);
            aRes.msg = "发送成功";
            return callback(aRes);
        } else {
            console.log(error)
            aRes.error = 1;
            aRes.msg = "发送失败";
            return callback(aRes);
        }
    });
}

/***
 * 验证验证码
 * @param phone
 * @param code
 * @param callback
 */
exports.validCode = function (phone, code, callback) {
    var aRes = comm.result();
    aRes.msg = "验证码正确";
    var sql = "SELECT * FROM fm_sms WHERE phone=? AND is_active=1 ORDER BY created_date DESC LIMIT 1";
    var param = [phone];
    mysql.query(sql, param, function (result) {
        if (!result.data.length) {
            aRes.error = 1;
            aRes.msg = '您未获取验证码';
            return callback(aRes);
        }
        var captcha = result.data[0].vcode;
        var msg_date = result.data[0].created_date;
        var msg_id = result.data[0].id;
        if (code != captcha) {
            aRes.error = 1;
            aRes.msg = '验证码输入错误';
            return callback(aRes);
        }
        var sLastTime = moment(msg_date).format('X');
        var sNow = moment().format('X');
        var iInterval = sNow - sLastTime;
        if (iInterval >= 600) { // 10分钟后过期
            discardCode(msg_id);
            aRes.error = 1;
            aRes.msg = '验证码已过期，请重新发送。';
            return callback(aRes);
        }
        discardCode(msg_id);
        return callback(aRes);
    });
}

/***
 *  标记验证码不可用
 * @param msg_id
 */
var discardCode = function (msg_id) {
    var sql = "UPDATE fm_sms SET is_active=0 WHERE id=?";
    mysql.query(sql, msg_id, function (result) {
    });
}