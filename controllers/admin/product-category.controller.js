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
    const newRecords = createTreeHelper.tree(records);
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
module.exports.edit = async (req,res) => {
    try {
        const id = req.params.id;
        const find = {
            deleted: false,
            _id : id
        };
        const category = await ProductCategory.findOne(find);
        
        const records = await ProductCategory.find({deleted: false}).lean();
        const newRecords = createTreeHelper.tree(records);
        res.render("admin/pages/product-category/edit",{
            pageTitle: "Chỉnh Sửa Sản Phẩm",
            category: category,
            records: newRecords
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
};
module.exports.editPatch = async (req,res) => {
    try {
        const id = req.params.id;
        req.body.position = parseInt(req.body.position);
        await ProductCategory.updateOne({_id: id},req.body);
        res.redirect(req.get("Referer") || `${systemConfig.prefixAdmin}/product-category`);
    } catch (error) {
        res.redirect(req.get("Referer") || `${systemConfig.prefixAdmin}/product-category`);
    }
};