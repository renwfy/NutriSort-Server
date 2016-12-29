var comm = require('../../config/common');
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
    var element_C = req.body.element_C;
    var element_GI = req.body.element_GI;
    var element_GL = req.body.element_GL;
    var element_P = req.body.element_P;
    var element_F = req.body.element_F;
    var element_Ca = req.body.element_Ca;
    var element_Zn = req.body.element_Zn;
    var element_k = req.body.element_k;
    var element_I = req.body.element_I;
    var element_Mg = req.body.element_Mg;
    var element_Fe = req.body.element_Fe;
    var element_Na = req.body.element_Na;
    var element_Cl = req.body.element_Cl;
    var element_Se = req.body.element_Se;
    var element_Cu = req.body.element_Cu;
    var element_Gr = req.body.element_Gr;
    var element_energy = req.body.element_energy;
    var element_carbohydrate = req.body.element_carbohydrate;
    var element_protein = req.body.element_protein;
    var element_animal_protein = req.body.element_animal_protein;
    var element_plant_protein = req.body.element_plant_protein;
    var element_axunge = req.body.element_axunge;
    var element_saturated = req.body.element_saturated;
    var element_minsaturated = req.body.element_minsaturated;
    var element_maxsaturated = req.body.element_maxsaturated;
    var element_threonine = req.body.element_threonine;
    var element_methionine = req.body.element_methionine;
    var element_leucine = req.body.element_leucine;
    var element_isoleucine = req.body.element_isoleucine;
    var element_phenylalanine = req.body.element_phenylalanine;
    var element_valine = req.body.element_valine;
    var element_lysine = req.body.element_lysine;
    var element_tryptophan = req.body.element_tryptophan;
    var element_histidine = req.body.element_histidine;
    var element_arginine = req.body.element_arginine;
    var element_glutamine = req.body.element_glutamine;
    var element_taurine = req.body.element_taurine;
    var element_cystine = req.body.element_cystine;
    var element_tyrosine = req.body.element_tyrosine;
    var element_niacin = req.body.element_niacin;
    var element_folicacid = req.body.element_folicacid;
    var element_pantothenic = req.body.element_pantothenic;
    var element_carnitine = req.body.element_carnitine;
    var element_biotin = req.body.element_biotin;
    var element_choline = req.body.element_choline;
    var element_Va = req.body.element_Va;
    var element_Vb1 = req.body.element_Vb1;
    var element_Vb2 = req.body.element_Vb2;
    var element_Vb6 = req.body.element_Vb6;
    var element_Vb12 = req.body.element_Vb12;
    var element_Vc = req.body.element_Vc;
    var element_Vd = req.body.element_Vd;
    var element_Ve = req.body.element_Ve;
    var element_Vk = req.body.element_Vk;

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
    var aRes = comm.result();
    var sql = "SELECT * FROM ns_material";
    var param = [];
    mysql.query(sql, param, function (result) {
        if (result.error == 0) {
            aRes.data = result.data;
            aRes.error = 0;
            aRes.msg = "添加成功";
        } else {
            aRes.data = null;
            aRes.error = -1;
            aRes.msg = "获取列表失败";
        }
        return res.send(aRes);
    });
};
