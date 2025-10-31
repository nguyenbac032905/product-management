const Product = require("../../models/product.model");
const newPriceProduct = require("../../helpers/product");
const CategoryProduct = require("../../models/product-category.model");
//[GET] /
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
        status: "active",
        featured: "1"
    };
    const productsFeatured = await Product.find(find);
    const newProductsFeatured = newPriceProduct.newPrice(productsFeatured);

    const productsNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"}).limit(6);
    const newProductsNew = newPriceProduct.newPrice(productsNew);
    res.render("client/pages/home/index",{
        pageTitle: "Trang chủ",
        productsFeatured: newProductsFeatured,
        newProductsNew: newProductsNew,
    });
};