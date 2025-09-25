
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
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

    //pagination
    let objectPagination = {
        currentPage: 1,
        limitItem: 4
    };
    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page);
    };
    objectPagination.skip = (objectPagination.currentPage - 1)*objectPagination.limitItem;

    //tính số trang
    const countProducts = await Product.countDocuments(find);
    const totalPage = Math.ceil(countProducts/objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    //pagination

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);

    res.render("admin/pages/products/index",{
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}