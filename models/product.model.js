const mongoose = require("mongoose");
//khai báo bộ khung dữ liệu
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: Boolean,
});
//tạo model
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
