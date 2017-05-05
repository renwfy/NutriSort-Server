module.exports = function (app) {
    //Index
    app.get('/', function (req, res) {
        res.render('index');
    });



    //admin
    var admin = require('./controllers/admin');
    app.get('/admin', admin.index);
    app.get('/admin/login', admin.login);
    app.get('/admin/user/list', admin.userlist);
    app.get('/admin/food/list', admin.foodlist);
    app.get('/admin/material/create', admin.materialcreate);
    app.get('/admin/food', admin.food);



    //webapp
    var webapp = require('./controllers/webapp');
    app.get('/app', webapp.index);

};