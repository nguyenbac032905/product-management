module.exports.registerPost = (req,res,next) => {
    if(!req.body.fullName){
        req.flash("error","vui lòng nhập họ tên");
        res.redirect(req.get("Referer") || "/admin/products");
        return;
    }
    if(!req.body.email){
        req.flash("error","vui lòng nhập email");
        res.redirect(req.get("Referer") || "/admin/products");
        return;
    }
    if(!req.body.password){
        req.flash("error","vui lòng nhập Mật khẩu");
        res.redirect(req.get("Referer") || "/admin/products");
        return;
    }
    //sử dụng next để chuyển sang hàm phía sau trong routes
    next();
};