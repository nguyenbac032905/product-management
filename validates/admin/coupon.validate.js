
module.exports.createPost = (req,res,next) => {
    if(!req.body.code){
        req.flash("error", "Vui lòng nhập tiêu đề");
        res.redirect(req.get("Referer"));
        return;
    }
    if(!(req.body.discountType=="percent"||req.body.discountType=="fixed")){
        req.flash("error", "Vui lòng chọn giảm phần trăm hoặc giảm giá");
        res.redirect(req.get("Referer"));
        return;
    }
    const discountValue = parseInt(req.body.discountValue);
    if(isNaN(discountValue) || discountValue <= 0){
        req.flash("error", "Vui lòng nhập giá trị giảm hợp lệ");
        res.redirect(req.get("Referer"));
        return;
    }
    if(req.body.discountType=="percent" && discountValue > 100){
        req.flash("error", "Vui lòng nhập % giảm hợp lệ");
        res.redirect(req.get("Referer"));
        return;
    }
    const maxDiscount = req.body.maxDiscount ? parseInt(req.body.maxDiscount) : null;
    if(maxDiscount !== null && (isNaN(maxDiscount) || maxDiscount < 0)){
        req.flash("error", "Vui lòng nhập giảm tối đa hợp lệ");
        res.redirect(req.get("Referer"));
        return;
    }
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    if(isNaN(startDate.getTime())){
        req.flash("error", "Vui lòng chọn ngày bắt đầu hợp lệ");
        res.redirect(req.get("Referer"));
        return;
    }
    if(isNaN(endDate.getTime())){
        req.flash("error", "Vui lòng chọn ngày hết hạn hợp lệ");
        res.redirect(req.get("Referer"));
        return;
    }
    if(startDate >= endDate){
        req.flash("error", "Vui lòng chọn ngày hết hạn phải sau ngày bắt đầu");
        res.redirect(req.get("Referer"));
        return;
    }
    next();
}