var comm = require('../../config/common');
var futil = require('../../config/utils');
var mysql = require('../../public/javascripts/mysql');

//新增原材料
exports.create = function (req, res, next) {
    var aRes = comm.result();
    var name = req.body.name;
    if (!name) {
        aRes.data = null;
        aRes.error = -1;
        aRes.msg = "请输入名称";
        return res.send(aRes);
    }
    var img = req.body.img;
    if(!img){
        aRes.data = null;
        aRes.error = -1;
        aRes.msg = "请上传图片";
        return res.send(aRes);
    }
    var intro = req.body.intro;
    var type = req.body.type;
    var element_C = futil.ifFloatNull(req.body.element_C);
    var element_GI = futil.ifFloatNull(req.body.element_GI);
    var element_GL = futil.ifFloatNull(req.body.element_GL);
    var element_P = futil.ifFloatNull(req.body.element_P);
    var element_F = futil.ifFloatNull(req.body.element_F);
    var element_Ca = futil.ifFloatNull(req.body.element_Ca);
    var element_Zn = futil.ifFloatNull(req.body.element_Zn);
    var element_k = futil.ifFloatNull(req.body.element_k);
    var element_I = futil.ifFloatNull(req.body.element_I);
    var element_Mg = futil.ifFloatNull(req.body.element_Mg);
    var element_Fe = futil.ifFloatNull(req.body.element_Fe);
    var element_Na = futil.ifFloatNull(req.body.element_Na);
    var element_Cl = futil.ifFloatNull(req.body.element_Cl);
    var element_Se = futil.ifFloatNull(req.body.element_Se);
    var element_Cu = futil.ifFloatNull(req.body.element_Cu);
    var element_Gr = futil.ifFloatNull(req.body.element_Gr);
    var element_energy = futil.ifFloatNull(req.body.element_energy);
    var element_carbohydrate = futil.ifFloatNull(req.body.element_carbohydrate);
    var element_protein = futil.ifFloatNull(req.body.element_protein);
    var element_animal_protein = futil.ifFloatNull(req.body.element_animal_protein);
    var element_plant_protein = futil.ifFloatNull(req.body.element_plant_protein);
    var element_axunge = futil.ifFloatNull(req.body.element_axunge);
    var element_saturated = futil.ifFloatNull(req.body.element_saturated);
    var element_minsaturated = futil.ifFloatNull(req.body.element_minsaturated);
    var element_maxsaturated = futil.ifFloatNull(req.body.element_maxsaturated);
    var element_threonine = futil.ifFloatNull(req.body.element_threonine);
    var element_methionine = futil.ifFloatNull(req.body.element_methionine);
    var element_leucine = futil.ifFloatNull(req.body.element_leucine);
    var element_isoleucine = futil.ifFloatNull(req.body.element_isoleucine);
    var element_phenylalanine = futil.ifFloatNull(req.body.element_phenylalanine);
    var element_valine = futil.ifFloatNull(req.body.element_valine);
    var element_lysine = futil.ifFloatNull(req.body.element_lysine);
    var element_tryptophan = futil.ifFloatNull(req.body.element_tryptophan);
    var element_histidine = futil.ifFloatNull(req.body.element_histidine);
    var element_arginine = futil.ifFloatNull(req.body.element_arginine);
    var element_glutamine = futil.ifFloatNull(req.body.element_glutamine);
    var element_taurine = futil.ifFloatNull(req.body.element_taurine);
    var element_cystine = futil.ifFloatNull(req.body.element_cystine);
    var element_tyrosine = futil.ifFloatNull(req.body.element_tyrosine);
    var element_niacin = futil.ifFloatNull(req.body.element_niacin);
    var element_folicacid = futil.ifFloatNull(req.body.element_folicacid);
    var element_pantothenic = futil.ifFloatNull(req.body.element_pantothenic);
    var element_carnitine = futil.ifFloatNull(req.body.element_carnitine);
    var element_biotin = futil.ifFloatNull(req.body.element_biotin);
    var element_choline = futil.ifFloatNull(req.body.element_choline);
    var element_Va = futil.ifFloatNull(req.body.element_Va);
    var element_Vb1 = futil.ifFloatNull(req.body.element_Vb1);
    var element_Vb2 = futil.ifFloatNull(req.body.element_Vb2);
    var element_Vb6 = futil.ifFloatNull(req.body.element_Vb6);
    var element_Vb12 = futil.ifFloatNull(req.body.element_Vb12);
    var element_Vc = futil.ifFloatNull(req.body.element_Vc);
    var element_Vd = futil.ifFloatNull(req.body.element_Vd);
    var element_Ve = futil.ifFloatNull(req.body.element_Ve);
    var element_Vk = futil.ifFloatNull(req.body.element_Vk);

    var sql = "INSERT INTO ns_material (name,img,intro,type,element_C,element_GI,element_GL,element_P,element_F,element_Ca,element_Zn,element_k,element_I,element_Mg,element_Fe,element_Na,element_Cl,element_Se,element_Cu,element_Gr,element_energy,element_carbohydrate,element_protein,element_animal_protein,element_plant_protein,element_axunge,element_saturated,element_minsaturated,element_maxsaturated,element_threonine,element_methionine,element_leucine,element_isoleucine,element_phenylalanine,element_valine,element_lysine,element_tryptophan,element_histidine,element_arginine,element_glutamine,element_taurine,element_cystine,element_tyrosine,element_niacin,element_folicacid,element_pantothenic,element_carnitine,element_biotin,element_choline,element_Va,element_Vb1,element_Vb2,element_Vb6,element_Vb12,element_Vc,element_Vd,element_Ve,element_Vk,created_date,updated_date) " +
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())";
    var param = [name,img,intro,type,element_C,element_GI,element_GL,element_P,element_F,element_Ca,element_Zn,element_k,element_I,element_Mg,element_Fe,element_Na,element_Cl,element_Se,element_Cu,element_Gr,element_energy,element_carbohydrate,element_protein,element_animal_protein,element_plant_protein,element_axunge,element_saturated,element_minsaturated,element_maxsaturated,element_threonine,element_methionine,element_leucine,element_isoleucine,element_phenylalanine,element_valine,element_lysine,element_tryptophan,element_histidine,element_arginine,element_glutamine,element_taurine,element_cystine,element_tyrosine,element_niacin,element_folicacid,element_pantothenic,element_carnitine,element_biotin,element_choline,element_Va,element_Vb1,element_Vb2,element_Vb6,element_Vb12,element_Vc,element_Vd,element_Ve,element_Vk];
    mysql.query(sql, param, function (result) {
        if (result.error == 0) {
            aRes.data = null;
            aRes.error = 0;
            aRes.msg = "添加成功";
        } else {
            aRes.data = null;
            aRes.error = -1;
            aRes.msg = "添加失败";
        }
        return res.send(aRes);
    });
};

//编辑
exports.edit = function (req, res) {
    var file_id = req.param('file_id');
    if (!file_id) {
        aRes.error = 1;
        aRes.msg = '请输入文件id';
        return res.send(aRes);
    }

    var sql = "DELETE FROM opple_file WHERE file_id=?";
    mysql.query(sql, [file_id], function (result) {
        return res.send(result);
    })
};

//列表
exports.list = function (req, res) {
    var start = req.query.start;
    var size = req.query.size;

    var aRes = comm.result();

    var sql = "SELECT COUNT(*) AS CNT FROM ns_material";
    var param = [];
    mysql.query(sql, param, function (result) {
        var cnt = result.data[0].CNT;
        if(cnt == 0){
            aRes.data.list = null;
            aRes.data.count = 0;
            aRes.error = 0;
            aRes.msg = "没有数据";
            return res.send(aRes);
        }
        var sql = "SELECT ma.id,ma.name,ma.type,ma.img,ma.intro,ma.element_C,ma.element_GI FROM ns_material ma WHERE is_active=1";
        var param = [];
        if (start && size) {
            //分页
            if (start <= 1) start = 1;
            start = start - 1;
            if (size == 0) size = 10;
            sql += " LIMIT ?,?";
            param.push(start*1);
            param.push(size*1);
        }
        mysql.query(sql, param, function (result) {
            if (result.error == 0) {
                aRes.data.list = result.data;
                aRes.data.count = cnt;
                aRes.error = 0;
                aRes.msg = "获取成功";
            } else {
                aRes.data = null;
                aRes.error = -1;
                aRes.msg = "获取列表失败";
            }
            return res.send(aRes);
        });
    });
};
