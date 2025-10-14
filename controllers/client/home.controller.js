const Product = require("../../models/product.model");
const newPriceProduct = require("../../helpers/product");
//[GET] /
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
        status: "active",
        featured: "1"
    };
    const productsFeatured = await Product.find(find);
    const newProductsFeatured = newPriceProduct.newPrice(productsFeatured);
    res.render("client/pages/home/index",{
        pageTitle: "Trang chủ",
        productsFeatured: newProductsFeatured
    });
};