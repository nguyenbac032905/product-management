const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/order.controller");

router.get("/", controller.index);
router.get("/detail/:orderId", controller.detail);
router.post("/change-status/:status/:orderId", controller.changeStatus);
router.post("/delete/:orderId",controller.delete);
module.exports = router;