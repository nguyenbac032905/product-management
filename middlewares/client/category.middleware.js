const createTreeHelper = require("../../helpers/createTree");
const ProductCategory = require("../../models/product-category.model");
module.exports.category = async (req,res,next) => {
    const productCategory = await ProductCategory.find({deleted: false}).lean();
    const newProductCategory = createTreeHelper.tree(productCategory);
    res.locals.layoutProductCategory = newProductCategory;
    next();
}