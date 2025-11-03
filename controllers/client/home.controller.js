const Product = require("../../models/product.model");
const newPriceProduct = require("../../helpers/product");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
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
    //lấy ra category
    const productCategory = await ProductCategory.find({deleted: false}).lean();
    const newProductCategory = createTreeHelper.tree(productCategory);
    res.render("client/pages/home/index",{
        pageTitle: "Trang chủ",
        productsFeatured: newProductsFeatured,
        newProductsNew: newProductsNew,
        layoutProductCategory: newProductCategory
    });
};