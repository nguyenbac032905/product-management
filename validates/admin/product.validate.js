const systemConfig = require("../../config/system");
module.exports.createPost = (req,res,next) => {
    if(!req.body.title){
        req.flash("error","vui lòng nhập tiêu đề");
        res.redirect(req.get("Referer") || `${systemConfig.prefixAdmin}/products`);
        return;
    }
    //sử dụng next để chuyển sang hàm phía sau trong routes
    next();
}