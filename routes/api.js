module.exports = function (app) {
    //七牛
    var qiniu = require('./apis/qiniu');
    app.get('/api/qiniu/uptoken', qiniu.uptoken);


    //material
    var food = require('./apis/food');
    //添加原材料
    app.post('/api/food/', food.food);
    //编辑
    app.get('/api/food/list', food.list);
    app.post('/api/food/delete', food.delete);
    app.get('/api/food/details', food.details);
    app.get('/api/food/hotlist', food.hotList);
};