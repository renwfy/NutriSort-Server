module.exports = function (app) {
    //七牛
    var qiniu = require('./apis/qiniu');
    app.get('/api/qiniu/uptoken', qiniu.uptoken);


    //material
    var material = require('./apis/material');
    //添加原材料
    app.post('/api/material/create', material.create);
    //编辑
    app.get('/api/material/list', material.list);
};