const md5 = require('md5');
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
module.exports.index = async (req,res) =>{
    res.render("admin/pages/my-account/index",{
        pageTitle: "My account"
    });
};
module.exports.edit = async (req,res) =>{
    res.render("admin/pages/my-account/edit",{
        pageTitle: "Chỉnh sửa"
    });
};
module.exports.editPatch = async (req,res) =>{
    try {
        const id = res.locals.user.id
        const emailExist = await Account.findOne({
            _id: {$ne: id},
            deleted: false,
            email: req.body.email
        });
        if(emailExist){
            req.flash("error","email đã tồn tại");
        }else{
            if(req.body.passwrord){
                req.body.password = md5(req.body.password);
            }else{
                delete req.body.password;
            }
        }
        await Account.updateOne({_id: id}, req.body);
        req.flash('success',"cập nhật thành công");
    } catch (error) {
        req.flash("error","cập nhật thất bại");
    }
    res.redirect(res.get("Referer") || `${systemConfig.prefixAdmin}/my-account/edit`);
};