const mongoose = require("mongoose");

//khai báo bộ khung dữ liệu
const roleSchema = new mongoose.Schema({
  title: String,
  description: String,
  permission: {
    type: Array,
    default: []
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
},{
  //nếu set timestamps = true thì tự động thêm 2 thuộc tính createAt và deleteAt 
  timestamps:true
});
//tạo model
const Role = mongoose.model("Role", roleSchema, "roles");
module.exports = Role;
