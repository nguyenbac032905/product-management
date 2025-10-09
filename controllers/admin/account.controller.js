const Account = require("../../models/account.model");
const Role = require("../../models/role.modle");
const systemConfig = require("../../config/system");
const md5 = require('md5');
module.exports.index = async (req,res)=>{
    let find = {
        deleted: false
    };

    const records = await Account.find(find).select("-password -token");
    for(const item of records){

        const role = await Role.findOne({
            deleted: false,
            _id: item.role_id
        });
        item.role = role.title;
    };
    
    res.render("admin/pages/accounts/index",{
        pageTitle: "Trang tài khoản",
        records: records
    });
};
module.exports.create = async (req,res)=>{
    const roles = await Role.find({deleted: false});
    
    res.render("admin/pages/accounts/create",{
        pageTitle: "Trang tạo tài khoản",
        roles: roles
    });
};
module.exports.createPost = async (req,res)=>{
    try {
        const emailExist = await Account.findOne({
            deleted:false,
            email: req.body.email
        });
        if(emailExist){
            req.flash("error","Email đã tồn tại");
        }else{
            req.body.password = md5(req.body.password);
            const record = new Account(req.body);
            await record.save();
            req.flash("success",'tạo thành công');
        }
    } catch (error) {
        req.flash("error", "tạo thất bại");
    }
    res.redirect(res.get("Referer") || `${systemConfig.prefixAdmin}/accounts/create`)
};