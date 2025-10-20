const express = require("express");
const router = express.Router();
//nhúng cloudiary
const controller = require("../../controllers/admin/setting-general.controller");
const validate = require("../../validates/admin/account.validate");
//nhúng middleware upload cloud
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");


router.get("/general",controller.general);
router.patch("/general",upload.single("logo"),uploadCloud.upload,controller.generalPatch);
module.exports = router;