const express = require("express");
const router = express.Router();
//nhúng cloudiary
const controller = require("../../controllers/admin/products.controller");
//nhúng validate để sử dụng
const validate = require("../../validates/admin/product.validate");
//nhúng middleware upload cloud
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/",controller.index);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);
router.delete("/delete/:id",controller.deleteProduct);
router.get("/create",controller.create);
//sử dụng validate làm middleware, chạy tới validate thỏa mãn thì mới chạy tới controller
router.post("/create",upload.single('thumbnail'),uploadCloud.upload,validate.createPost,controller.createPost);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",upload.single('thumbnail'),uploadCloud.upload,validate.createPost,controller.editPatch);
router.get("/detail/:id",controller.detail);
module.exports = router;