const User = require("../../models/user.model");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");
const ForgotPassword = require("../../models/forgot-password.model");
const Cart = require("../../models/cart.model");
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
    res.redirect("/user/login");
};
module.exports.login = async (req,res) => {
    res.render("client/pages/user/login",{
        pageTitle: "Đăng nhập"
    });
};
module.exports.loginPost = async (req,res) =>{
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
    
    const cart = await Cart.findOne({
        user_id: user.id
    });
    if(cart){
        res.cookie("cartId",cart.id);
    }else{
        await Cart.updateOne({_id: req.cookies.cartId},{user_id: user.id});
    }

    res.cookie("tokenUser",user.tokenUser);

    await User.updateOne({tokenUser: user.tokenUser},{statusOnline: "online"});
    _io.once("connection",(socket) =>{
        socket.broadcast.emit("SERVER_RETURN_STATUS",{
            userId: user.id,
            status: "online"
        });
    });

    res.redirect("/");
};
module.exports.logout = async (req,res) =>{
    await User.updateOne({tokenUser: req.cookies.tokenUser},{statusOnline: "offline"});
    _io.once("connection",(socket) =>{
        socket.broadcast.emit("SERVER_RETURN_STATUS",{
            userId: res.locals.user.id,
            status: "offline"
        });
    });
    res.clearCookie("tokenUser");
    res.clearCookie("cartId");
    res.redirect("/user/login");
};
module.exports.forgotPassword = async (req,res) =>{
    res.render("client/pages/user/forgot-password",{
        pageTitle: "Quên mật khẩu"
    });
};
module.exports.forgotPasswordPost = async (req,res) =>{
    const user = await User.findOne({
        email: req.body.email,
        deleted: false,
    });
    if(!user){
        req.flash("error","Email không tồn tại");
        res.redirect("/user/password/forgot");
        return;
    }
    //lưu thông tin vào database
    const otp = generateHelper.generateRandomNumber(5);
    const objectForgotPassword = {
        email: user.email,
        otp: otp,
        expireAt: Date.now()
    };
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    //nếu tồn tại email thì gửi otp qua email
    const subject = "Mã Otp xác minh mật khẩu";
    const html = `Mã OTP để thay đổi mật khẩu là: <b>${otp}</b>. Thời hạn otp: 5 phút`;
    sendMailHelper.sendMail(user.email,subject,html);
    res.redirect(`/user/password/otp?email=${user.email}`);
};
module.exports.otpPassword = async (req,res) =>{
    const email = req.query.email;
    res.render("client/pages/user/otp-password",{
        pageTitle: "Nhập otp",
        email: email
    });
};
module.exports.otpPasswordPost = async (req,res) =>{
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });
    if(!result){
        req.flash("error","Otp không hợp lệ");
        res.redirect(req.get("Referer"));
    };
    const user = await User.findOne({email: email});
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/user/password/reset");
};
module.exports.resetPassword = async (req,res) =>{
    res.render("client/pages/user/reset-password",{
        pageTitle: "Mật khẩu mới"
    });
};
module.exports.resetPasswordPost = async (req,res) =>{
    const password = md5(req.body.password);
    const tokenUser = req.cookies.tokenUser;
    await User.updateOne({tokenUser: tokenUser},{password: password});
    req.flash("success","đổi mật khẩu thành công");
    res.redirect("/");
};
module.exports.infoUser = async (req,res) =>{
    const user = res.locals.user;
    
    res.render("client/pages/user/info-user",{
        pageTitle: "Trang cá nhân",
        user: user
    });
};