var material = require('./apis/material');

module.exports = function (app) {
    //material
    //添加原材料
    app.post('/api/material/create', material.create);

    //编辑
    app.get('/api/material/list', material.list);
};