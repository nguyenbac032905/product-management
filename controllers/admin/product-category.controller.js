const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
const filterStatusHelper = require("../../helpers/filterStatus");
// [GET]/product-category
module.exports.index = async (req,res) => {
    let find = {
        deleted: false
    };
    const filterStatus = filterStatusHelper(req);
    if(req.query.status){
        find.status = req.query.status;
    };

    const records = await ProductCategory.find(find).lean();
    console.log(records);
    const newRecords = createTreeHelper.tree(records);
    console.log(newRecords);
    res.render("admin/pages/product-category/index",{
        pageTitle: "Trang Danh Mục",
        category: newRecords,
        filterStatus: filterStatus
    });
};
// [GET]/product-category/create
module.exports.create = async (req,res) => {
    let find = {
        deleted: false
    };

    const records = await ProductCategory.find(find).lean();
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/product-category/create",{
        pageTitle: "Trang Tạo Danh Mục",
        records: newRecords
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
module.exports.changeStatus = async (req,res) => {
    try {
        const status = req.params.status;
        const id = req.params.id;
        await ProductCategory.updateOne({_id: id},{status: status});
        req.flash("success", "cập nhật thành công");
    } catch (error) {
        req.flash("error", "cập nhật thất bại");
    } finally{
        res.redirect(req.get("Referer") || `/${systemConfig.prefixAdmin}/product-category`);
    }
};