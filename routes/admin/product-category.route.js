const express = require("express");
const router = express.Router();
//nhúng cloudiary
const controller = require("../../controllers/admin/product-category.controller");
//nhúng validate để sử dụng
const validate = require("../../validates/admin/product-category.validate");
//nhúng middleware upload cloud
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");


router.get("/",controller.index);
router.get("/create",controller.create);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.post("/create",upload.single('thumbnail'),uploadCloud.upload,validate.createPost,controller.createPost);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",upload.single('thumbnail'),uploadCloud.upload,validate.createPost,controller.editPatch);
module.exports = router;