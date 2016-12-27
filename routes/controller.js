module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    //admin
    var admin = require('./controllers/admin');
    app.get('/admin', admin.index);
    app.get('/admin/login', admin.login);
    app.get('/admin/user/list', admin.userlist);
    app.get('/admin/material/list', admin.materiallist);
    app.get('/admin/material/create', admin.materialcreate);

    //material
    //原材料（食材）
    var material = require('./controllers/material');
    app.get('/material/create', material.create);
};