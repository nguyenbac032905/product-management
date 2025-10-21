const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/chat.controller");
const authenMiddleware = require("../../middlewares/client/auth.middleware");

router.get("/",authenMiddleware.requireAuth, controller.index);

module.exports = router;