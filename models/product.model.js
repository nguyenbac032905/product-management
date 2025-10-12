const mongoose = require("mongoose");
//khai bao slug
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
//khai báo bộ khung dữ liệu
const productSchema = new mongoose.Schema({
  title: String,
  product_category_id:{
    type: String,
    default: ""
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
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
  deleted: Boolean,
  deletedBy:{
    account_id: String,
    deletedAt: Date
  },
  updatedBy:[
    {
      account_id: String,
      updatedAt: Date
    }
  ],
  deletedAt: Date
},{
  //nếu set timestamps = true thì tự động thêm 2 thuộc tính createAt và deleteAt 
  timestamps:true
});
//tạo model
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
