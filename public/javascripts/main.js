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
 * 七牛上传
 * @param uptoken
 * @constructor
 */
function QiniuUpLoad(uptoken,buttonId,callback) {
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',      // 上传模式，依次退化
        browse_button: buttonId,         // 上传选择的点选按钮，必需
        uptoken : uptoken,                  // uptoken是上传凭证，由其他程序生成
        unique_names: true,               //// 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
        //save_key: false,                // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
        domain: 'http://oivzpz56a.bkt.clouddn.com/',     // bucket域名，下载资源时用到，必需
        get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
        //container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
        max_file_size: '100mb',             // 最大文件体积限制
        flash_swf_url: '/javascripts/plupload/Moxie.swf',  //引入flash，相对路径
        max_retries: 3,                     // 上传失败最大重试次数
        dragdrop: true,                     // 开启可拖曳上传
        //drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                  // 分块上传时，每块的体积
        auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FilesAdded': function(up, files) {
                layer.msg('上传中……', {
                    icon: 16
                    ,shade: 0.01
                });
                plupload.each(files, function(file) {
                    // 文件添加进队列后，处理相关的事情
                });
            },
            'BeforeUpload': function(up, file) {
                // 每个文件上传前，处理相关的事情
            },
            'UploadProgress': function(up, file) {
                // 每个文件上传时，处理相关的事情
            },
            'FileUploaded': function(up, file, info) {
                // 每个文件上传成功后,处理相关的事情
                layer.closeAll();
                var domain = up.getOption('domain');
                var res = JSON.parse(info);
                var url = domain + res.key
                callback(url);
            },
            'Error': function(up, err, errTip) {
                //上传出错时，处理相关的事情
                layer.closeAll();
            },
            'UploadComplete': function() {
                //队列文件处理完毕后，处理相关的事情
                layer.closeAll();
            },
            'Key': function(up, file) {
                // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                // 该配置必须要在unique_names: false，save_key: false时才生效
                var key = "";
                // do something with key here
                return key
            }
        }
    });
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