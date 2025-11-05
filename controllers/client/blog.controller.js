const Blog = require("../../models/blog.model");
const BlogCategory = require("../../models/blog-category.model");
module.exports.index = async (req,res) =>{
    const blogs = await Blog.find({deleted: false}).sort({position: -1});
    const blogCategory = await BlogCategory.find({deleted: false});
    const blogsLatest = await Blog.find({deleted: false}).sort({position: 1}).limit(6);
    console.log(blogs)
    console.log(blogsLatest)
    res.render("client/pages/blog/index",{
        pageTitle: "Tin mới nhất",
        blogs: blogs,
        blogCategory: blogCategory,
        blogsLatest: blogsLatest
    });
};
module.exports.detailBlog = async (req,res) =>{
    const blogsCategory = await BlogCategory.find({deleted: false});

    const slug = req.params.slugBlog;
    const blog = await Blog.findOne({deleted: false, slug: slug});

    const categoryBlog = await BlogCategory.findOne({deleted: false, _id: blog.blog_category_id});
    blog.categoryBlog = categoryBlog;

    res.render("client/pages/blog/detail",{
        pageTitle: "Chi tiết Blog",
        blog: blog,
        blogCategory: blogsCategory
    });
};
module.exports.categoryBlog = async (req,res) =>{
    const blogCategory = await BlogCategory.find({deleted: false});
    const blogsLatest = await Blog.find({deleted: false}).sort({position: "asc"}).limit(6);

    const category = await BlogCategory.findOne({slug: req.params.slugCategoryBlog, deleted: false});
    const blogs = await Blog.find({deleted: false, blog_category_id: category.id});

    res.render("client/pages/blog/index",{
        pageTitle: category.title,
        blogs: blogs,
        blogCategory: blogCategory,
        blogsLatest: blogsLatest
    })
};