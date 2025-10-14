const ProductCategory = require("../models/product-category.model");
module.exports.getSubCategory = async (parent_id) =>{
    const getCategory = async (parent_id) =>{
    const subs = await ProductCategory.find({
        deleted: false,
        status: "active",
        parent_id: parent_id
    });
    let allSub = [...subs];
    for(const sub of subs){
        const childs = await getCategory(sub._id);
        allSub = allSub.concat(childs);
    }
    return allSub;
    }

    const result = await getCategory(parent_id);
    return result;
}