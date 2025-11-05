const Product = require("../../models/product.model");
const newPriceProduct = require("../../helpers/product");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
//[GET] /
module.exports.index = async (req, res) => {
    //lấy ra sản phẩm nổi bật
    let find = {
        deleted: false,
        status: "active",
        featured: "1"
    };
    const productsFeatured = await Product.find(find).limit(10);
    const newProductsFeatured = newPriceProduct.newPrice(productsFeatured);
    // lấy ra sản phẩm mới
    const productsNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"}).limit(10);
    const newProductsNew = newPriceProduct.newPrice(productsNew);
    //lấy ra sản phẩm giảm giá
    const productsSale = await Product.find({
        deleted: false,
        status: "active",
        discountPercentage: {$gt: 0}
    }).limit(20);
    const newProductsSale = newPriceProduct.newPrice(productsSale);
    //lấy ra category
    const productCategory = await ProductCategory.find({deleted: false}).lean();
    const newProductCategory = createTreeHelper.tree(productCategory);
    res.render("client/pages/home/index",{
        pageTitle: "Trang chủ",
        productsFeatured: newProductsFeatured,
        newProductsNew: newProductsNew,
        layoutProductCategory: newProductCategory,
        newProductsSale: newProductsSale
    });
};