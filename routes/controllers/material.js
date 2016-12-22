//新增原食材
exports.create = function (req, res, next) {
    var id = req.params.id;
    res.render('material/create', {
        title: "新增食材",
    });
};