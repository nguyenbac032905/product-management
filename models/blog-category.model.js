const mongoose = require("mongoose");
//khai bao slug
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
//khai báo bộ khung dữ liệu
const blogCategorySchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    status: String,
    position: Number,
    slug:{
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
  timestamps:true
});

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema, "blog-category");
module.exports = BlogCategory;
