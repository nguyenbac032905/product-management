const Blog = require("../../models/blog.model");
const systemConfig = require("../../config/system");
const BlogCategory = require("../../models/blog-category.model");
module.exports.index = async (req,res) =>{
    const blogs = await Blog.find({deleted: false});
    res.render("admin/pages/blog/index",{
        pageTitle: "Bài viết",
        records: blogs
    });
};
module.exports.create = async (req,res) =>{
    const category = await BlogCategory.find({deleted: false});
    res.render("admin/pages/blog/create",{
        pageTitle: "Tạo Bài Viết",
        category: category
    });
};
module.exports.createPost = async (req,res) =>{
    if(req.body.position == ""){
        const countBlog = await Blog.countDocuments();
        req.body.position = countBlog + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    const user = res.locals.user;
    req.body.createdBy = {
        account_id: user.id
    };

    const blog = new Blog(req.body);
    await blog.save();
    res.redirect(`${systemConfig.prefixAdmin}/blogs`);
}