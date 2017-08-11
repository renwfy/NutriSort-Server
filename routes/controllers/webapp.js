var fUtils = require('../../public/serverutils/funUtils');

exports.index = function (req, res, next) {
    var params = fUtils.getParams(req);
    res.render('webapp/index', {
        title: "营养家",
        params:params,
    });
};