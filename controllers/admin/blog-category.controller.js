const BlogCategory = require("../../models/blog-category.model");
const systemConfig = require("../../config/system");
module.exports.index = async (req,res) =>{
    const blogCategory = await BlogCategory.find({deleted: false});
    res.render("admin/pages/blog-category/index",{
        pageTitle: "Danh mục bài viết",
        category: blogCategory
    });
};
module.exports.create = async (req,res) =>{
    res.render("admin/pages/blog-category/create",{
        pageTitle: "Tạo Danh mục"
    });
};
module.exports.createPost = async (req,res) =>{
    if(req.body.position == ""){
        const count = await BlogCategory.countDocuments()
        req.body.position = count + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    const record = new BlogCategory(req.body);
    await record.save();
    req.flash("success","Tạo danh mục blog thành công");
    res.redirect(`${systemConfig.prefixAdmin}/blog-category`);
}