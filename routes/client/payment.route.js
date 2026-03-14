const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/payment.controller");

router.get("/create_payment_url/:orderId", controller.index);
router.get("/return_payment_url", controller.returnPayment);
module.exports = router;