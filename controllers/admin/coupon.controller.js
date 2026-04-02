const Coupon = require("../../models/coupon.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req,res) => {
    const records = await Coupon.find({deleted: false});
    res.render("admin/pages/coupons/index",{
        pageTitle: "Coupon",
        records: records
    })
}
module.exports.create = (req,res) => {
    res.render("admin/pages/coupons/create",{
        pageTitle: "Create"
    })
}
module.exports.createPost = async (req,res) => {
    req.body.code = req.body.code.toLowerCase();
    req.body.discountValue = parseInt(req.body.discountValue);
    req.body.maxDiscount = req.body.maxDiscount ? parseInt(req.body.maxDiscount) : null;
    req.body.minOrderValue = req.body.minOrderValue ? parseInt(req.body.minOrderValue) : null;
    req.body.startDate = new Date(req.body.startDate);
    req.body.endDate = new Date(req.body.endDate);
    const coupon = new Coupon(req.body);
    await coupon.save();
    req.flash("success","Tạo mới thành công");
    res.redirect(req.get("Referer"));
}