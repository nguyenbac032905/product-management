const md5 = require("md5");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");

module.exports.login = async (req,res) => {
    if(req.cookies.token){
        const user = await Account.findOne({token: req.cookies.token});
        if(user){
            res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
        }else{
            res.render("admin/pages/auth/login",{
                pageTitle: "Đăng nhập"
            });
        }
    }else{
        res.render("admin/pages/auth/login",{
            pageTitle: "Đăng nhập"
        });
    }
};
module.exports.loginPost = async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await Account.findOne({
        email: email,
        deleted: false
    });
    
    if(!user){
        req.flash("error","email không tồn tại");
        res.redirect(res.ges("Referer") || `${systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    if(md5(password) != user.password ){
        req.flash("error","Sai mật khẩu");
        res.redirect(res.ges("Referer") || `${systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    if(user.status != "active"){
        req.flash("error","Tài khoản đã bị khóa");
        res.redirect(res.ges("Referer") || `${systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    //tạo cookie bên backend
    res.cookie("token",user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};
module.exports.logout = async (req,res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};