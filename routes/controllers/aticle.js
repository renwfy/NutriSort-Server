exports.create = function (req, res, next) {
    var id = req.params.id;
    res.render('article/details', {
        title: "文章详情",
        id: id
    });
};