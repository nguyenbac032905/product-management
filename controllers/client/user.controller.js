const User = require("../../models/user.model");
const md5 = require("md5");
module.exports.register = async (req,res) =>{
    res.render("client/pages/user/register",{
        pageTitle: "Đăng ký"
    });
};
module.exports.registerPost = async (req,res) =>{
    const existEmail = await User.findOne({
        email: req.body.email
    });
    if(existEmail){
        req.flash("error","email đã tồn tại");
        res.redirect("/user/register");
        return;
    }

    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    
    res.cookie("tokenUser",user.tokenUser);
    req.flash('success',"Đăng ký thành công");
    res.redirect("/user/register");
};
module.exports.login = async (req,res) => {
    res.render("client/pages/user/login",{
        pageTitle: "Đăng nhập"
    });
};
module.exports.loginPost = async (req,res) =>{
    console.log(req.body);
    const password = md5(req.body.password);
    const user = await User.findOne({
        email: req.body.email,
        deleted: false
    });
    if(!user){
        req.flash("error","Sai email");
        res.redirect("/user/login");
        return;
    }
    if(password != user.password){
        req.flash("error","Sai mật khẩu");
        res.redirect("/user/login");
        return;
    }
    if(user.status == "inactive"){
        req.flash("error","Tài khoản đã bị khóa");
        res.redirect("/user/login");
        return;
    }
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/");
}