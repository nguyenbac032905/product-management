module.exports.registerPost = (req,res,next) => {
    if(!req.body.fullName){
        req.flash("error","vui lòng nhập họ tên");
        res.redirect(req.get("Referer") || "/user/register");
        return;
    }
    if(!req.body.email){
        req.flash("error","vui lòng nhập email");
        res.redirect(req.get("Referer") || "/user/register");
        return;
    }
    if(!req.body.password){
        req.flash("error","vui lòng nhập Mật khẩu");
        res.redirect(req.get("Referer") || "/user/register");
        return;
    }
    //sử dụng next để chuyển sang hàm phía sau trong routes
    next();
};

module.exports.loginPost = (req,res,next) => {
    if(!req.body.email){
        req.flash("error","vui lòng nhập email");
        res.redirect(req.get("Referer")|| "/user/login");
        return;
    }
    if(!req.body.password){
        req.flash("error","vui lòng nhập Mật khẩu");
        res.redirect(req.get("Referer") || "/user/login");
        return;
    }
    //sử dụng next để chuyển sang hàm phía sau trong routes
    next();
};

module.exports.forgotPasswordPost = (req,res,next) => {
    if(!req.body.email){
        req.flash("error","vui lòng nhập email");
        res.redirect(req.get("Referer")|| "/user/password/forgot");
        return;
    }
    //sử dụng next để chuyển sang hàm phía sau trong routes
    next();
};
module.exports.resetPasswordPost = (req,res,next) => {
    if(!req.body.password){
        req.flash("error","vui lòng nhập mật khẩu");
        res.redirect(req.get("Referer"));
        return;
    }
    if(!req.body.confirmPassword){
        req.flash("error","vui lòng xác nhận mật khẩu");
        res.redirect(req.get("Referer"));
        return;
    }
    if(req.body.password != req.body.confirmPassword){
        req.flash("error","Mật khẩu xác nhận sai");
        res.redirect(req.get("Referer"));
        return;
    }
    //sử dụng next để chuyển sang hàm phía sau trong routes
    next();
};