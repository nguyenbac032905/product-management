const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/products.controller");
//nhúng validate để sử dụng
const validate = require("../../validates/admin/product.validate");
//import hàm storageMulter
const storageMulter = require("../../helpers/storageMulter");
const multer  = require('multer');
//nơi lưu ảnh
const upload = multer({storage: storageMulter()});

router.get("/",controller.index);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);
router.delete("/delete/:id",controller.deleteProduct);
router.get("/create",controller.create);
//sử dụng validate làm middleware, chạy tới validate thỏa mãn thì mới chạy tới controller
router.post("/create",upload.single('thumbnail'),validate.createPost,controller.createPost);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",upload.single('thumbnail'),validate.createPost,controller.editPatch);
module.exports = router;