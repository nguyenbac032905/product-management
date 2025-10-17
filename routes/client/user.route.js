const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");

router.get("/register", controller.register);
router.get("/login",controller.login);
router.post("/login",validate.loginPost,controller.loginPost);

router.post("/register",validate.registerPost,controller.registerPost);

module.exports = router;