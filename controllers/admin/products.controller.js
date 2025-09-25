
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

    const products = await Product.find(find);

    res.render("admin/pages/products/index",{
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    });
}