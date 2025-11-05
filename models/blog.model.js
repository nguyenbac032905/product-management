const mongoose = require("mongoose");
//khai bao slug
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
//khai báo bộ khung dữ liệu
const blogSchema = new mongoose.Schema({
    title: String,
    blog_category_id:{
        type: String,
        default: ""
    },
    content: String,
    thumbnail: String,
    description: String,
    status: {
        type: String,
        default: 'active'
    },
    position: Number,
    slug:{
        type: String,
        slug: "title",
        unique: true
    },
    createdBy:{
        account_id: String,
        createdAt: {
        type: Date,
        default: Date.now
        }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy:{
        account_id: String,
        deletedAt: Date
    },
    updatedBy:[
        {
        account_id: String,
        updatedAt: Date
        }
    ]
},{
  //nếu set timestamps = true thì tự động thêm 2 thuộc tính createAt và deleteAt 
  timestamps:true
});
//tạo model
const Blog = mongoose.model("Blog", blogSchema, "blogs");
module.exports = Blog;
