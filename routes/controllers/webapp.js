var fUtils = require('../../public/serverutils/funUtils');

exports.index = function (req, res, next) {
    var pamas = fUtils.getPamas(req);
    res.render('admin/home', {
        title: "管理后台",
        pamas:pamas,
    });
};