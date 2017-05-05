var fUtils = require('../../public/serverutils/funUtils');

exports.index = function (req, res, next) {
    var pamas = fUtils.getPamas(req);
    res.render('webapp/index', {
        title: "营养家",
        pamas:pamas,
    });
};