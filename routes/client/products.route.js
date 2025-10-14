//khai báo express để sử dụng hàm router
const express = require("express");
//khai báo 1 router
const router = express.Router();
//import controller
const controller = require("../../controllers/client/product.controller");

//nối phần index truyền vào thành /products/
router.get("/", controller.index);
router.get("/detail/:slugProduct", controller.detail);
router.get("/:slugCategory",controller.category);


//export router 
module.exports = router;