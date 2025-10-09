const express = require("express");
const router = express.Router();
//nhúng cloudiary
const controller = require("../../controllers/admin/account.controller");
const validate = require("../../validates/admin/account.validate");
//nhúng middleware upload cloud
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");


router.get("/",controller.index);
router.get("/create",controller.create);
router.post("/create",upload.single('avatar'),uploadCloud.upload,validate.createPost,controller.createPost);
module.exports = router;