const systemConfig = require("../../config/system");
module.exports.loginPost = (req,res,next) => {
    if(!req.body.email){
        req.flash("error","vui lòng nhập email");
        res.redirect(req.get("Referer") || `${systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    if(!req.body.password){
        req.flash("error","vui lòng nhập mật khẩu");
        res.redirect(req.get("Referer") || `${systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    //sử dụng next để chuyển sang hàm phía sau trong routes
    next();
}