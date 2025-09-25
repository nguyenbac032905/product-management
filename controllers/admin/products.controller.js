
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
// [GET] /admin/products
module.exports.index = async (req,res) => {
    const filterStatus = filterStatusHelper(req);
    //search
    let keyword = "";

    let find = {
        deleted: false
    };

    if(req.query.status){
        find.status = req.query.status;
    };

    if(req.query.keyword){
        keyword = req.query.keyword;
        
        //sử dụng regex để tìm kiếm
        const regex = new RegExp(keyword,"i");
        console.log(regex)
        find.title = regex;
    };

    const products = await Product.find(find);

    res.render("admin/pages/products/index",{
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });
}