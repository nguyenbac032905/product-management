const Product = require("../../models/product.model");
const searchHelper = require("../../helpers/search");
const productPriceNew = require("../../helpers/product");
module.exports.index = async (req,res) =>{
    const keyword = req.query.keyword;
    let find = {
        deleted: false,
        status: "active"
    };

    if(keyword){
        const objectSearch = searchHelper(req);
        if(objectSearch){
            find.title = objectSearch.regex;
        }
    }

    const productsSearched = await Product.find(find);

    const newProducts = productPriceNew.newPrice(productsSearched);

    res.render("client/pages/search/index",{
        pageTitle: "Kết quả tìm kiếm",
        keyword: keyword,
        products: newProducts
    });
};