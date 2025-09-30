
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
// [GET] /admin/products
module.exports.index = async (req,res) => {
    let find = {
        deleted: false
    };
    //filterstatus
    const filterStatus = filterStatusHelper(req);
    if(req.query.status){
        find.status = req.query.status;
    };
    //search
    const objectSearch = searchHelper(req);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    };

    //phantrang
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItem: 4
        },
        req,
        countProducts
    );
    const products = await Product.find(find)
        .sort({position: "desc"})
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);

    res.render("admin/pages/products/index",{
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
};

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req,res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({_id: id},{status: status});
    req.flash('success', 'Cập nhật trạng thái thành công!');
    //quay lại trang trước
    res.redirect(req.get("Referer") || "/admin/products");
};

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",");
    switch (type) {
        case "active":
            await Product.updateMany({_id: {$in: ids}},{$set: {status: "active"}});
            req.flash('success', `Cập nhật ${ids.length} sản phẩm thành hoạt động`);
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}},{$set: {status: "inactive"}});
            req.flash('success', `Cập nhật ${ids.length} sản phẩm thành dừng hoạt động`);
            break;
        //xóa nhiều
        case "delete-all":
            await Product.updateMany({_id: {$in: ids}},{$set: {deleted: true, deletedAt: new Date()}});
            req.flash('success', `đã xóa ${ids.length} sản phẩm`);
            break;
        case "change-position":
            for(item of ids){
                let [id,position] = item.split("-");
                position=parseInt(position);
                await Product.updateOne({_id: {$in: id}},{$set: {position: position}});
            }
            // await Product.updateMany({_id: {$in: ids}},{$set: {status: "inactive"}});
            req.flash('success', `Cập nhật vị trí cho ${ids.length} sản phẩm thành công`);
            break;
        default:
            break;
    }
   res.redirect(req.get("Referer")||"/admin/products");
};

//[DELETE] /admin/products/delete/:id
module.exports.deleteProduct = async (req,res) => {
    const id = req.params.id;
    // await Produuct.deleteOne({_id: id});
    await Product.updateOne({_id: id},{deleted: true, deletedAt: new Date()});
    req.flash('success', `xóa thành công`);

    res.redirect(req.get("Referer") || "/admin/products");
};

//[GET] /admin/create
module.exports.create = async (req,res) => {
    res.render("admin/pages/products/create",{
        pageTitle: "Tạo sản phẩm"
    })
};
module.exports.createPost = async (req,res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position == ""){
        const countProducts = await Product.countDocuments()
        req.body.position = countProducts + 1;
    }else{
       req.body.position = parseInt(req.body.position);
    }
    //cú pháp tạo mới
    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
};