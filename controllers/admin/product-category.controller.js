const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
// [GET]/product-category
module.exports.index = async (req,res) => {
    let find = {
        deleted: false
    };
    const records = await ProductCategory.find(find);

    res.render("admin/pages/product-category/index",{
        pageTitle: "Trang Danh Mục",
        category: records
    });
};
// [GET]/product-category/create
module.exports.create = async (req,res) => {
    res.render("admin/pages/product-category/create",{
        pageTitle: "Trang Tạo Danh Mục",
    });
};
// [GET]/product-category/create
module.exports.createPost = async (req,res) => {
    if(req.body.position == ""){
        const count = await ProductCategory.countDocuments()
        req.body.position = count + 1;
    }else{
       req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
};