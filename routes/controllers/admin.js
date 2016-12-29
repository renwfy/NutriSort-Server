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