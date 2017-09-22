var fUtils = require('../../public/serverutils/funUtils');

//后台
exports.index = function (req, res, next) {
    res.render('admin/home', {
        title: "管理后台",
    });
};

//后台登陆
exports.login = function (req, res, next) {
    res.render('admin/login', {
        title: "后台登陆",
    });
};

//用户列表
exports.userlist = function (req, res, next) {
    res.render('admin/user_list', {
        title: "用户列表",
    });
};

//食材列表
exports.materiallist = function (req, res, next) {
    res.render('admin/material_list', {
        title: "食材列表",
    });
};

//食材列表
exports.materialcreate = function (req, res, next) {
    res.render('admin/material_create', {
        title: "添加食材",
    });
};


exports.foodlist = function (req, res, next) {
    var page = req.query.page;
    res.render('admin/food_list', {
        title: "未编辑食材列表",
        page:page,
    });
};

exports.foodlistok = function (req, res, next) {
    var page = req.query.page;
    res.render('admin/food_list_ok', {
        title: "已编辑食材列表",
        page:page,
    });
};

//食材创建编辑
exports.food = function (req, res, next) {
    var id = req.query['id']
    res.render('admin/food', {
        title: "编辑食材",
        id: id
    })
}