/**
 * Created by LSD on 16/12/22.
 */

//判断值是否存在
function isset(value) {
    if (typeof(value) == "undefined") {
        return false;
    }
    return true;
}

//判断是否为空
function isNotNull(string) {
    if (!string) {
        return false;
    }
    if (string.replace(/(^s*)|(s*$)/g, "").length == 0) {
        return false;
    }
    return true;
}

/***
 * 页面跳转
 * @param url
 */
function gotoPage(url) {
    document.location.href = url;
}

/***
 * 列表页面内容更新
 * @param currPage
 * @param container
 * @param strHTML
 * @returns {boolean}
 */
function refreshListContent(currPage, container, strHTML) {
    if (currPage <= 1) {
        $(container).html(strHTML);
        return false;
    }
    $(container).append(strHTML);
    return true;
}

//列表内容的刷新
function doRefreshList(userInfo) {
    // var userObj = doRefreshLogin(userInfo);
    // if (!userObj) {
    //     return false;
    // }

    //初始化参数
    g_currPage = 1;
    g_isNextPage = true;
    g_documentHeight = 0;
    g_windowHeight = 0;

    //刷新内容
    doPageLoad();
}


/***
 * GET
 * @param url
 * @param data
 * @param callback
 * @constructor
 */
function API_GET(url, data, callback) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: url,
        data: data,
        success: function (result) {
            callback(result);
        },
        error: function (msg) {
            console.log(msg);
        }
    })
};


/***
 * POST
 * @param url
 * @param data
 * @param callback
 * @constructor
 */
function API_POST(url, data, callback) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: url,
        data: data,
        success: function (result) {
            callback(result);
        },
        error: function (msg) {
            console.log(msg);
        }
    })
};


/***
 * 跟原生js交互
 * @type {{}}
 */
family = typeof(family) == 'undefined' ? {} : family;
family.ready = function (callback) {
    var ua = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(ua)) {	// ios
        if (window.WebViewJavascriptBridge) {
            family.bridge = WebViewJavascriptBridge;
            callback();
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                family.bridge = WebViewJavascriptBridge;
                callback()
            }, false);
        }
    }
    else {	// android
        callback();
    }
}