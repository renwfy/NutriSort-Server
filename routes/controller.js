var material = require('./controllers/material');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });


    //material
    //原材料（食材）
    app.get('/material/create', material.create);
};