const Router = require("express");
const router = new Router();
const userController = require("../controller/UserController");

router.post("/register", userController.Register);

module.exports = router;
