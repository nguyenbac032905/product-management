
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
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
    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);

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
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}},{$set: {status: "inactive"}});
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

    res.redirect(req.get("Referer") || "/admin/products");
};