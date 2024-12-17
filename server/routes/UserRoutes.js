// heres qurery is http://localhost:2492/api/user

const Router = require("express");
const router = new Router();
const userController = require("../controller/UserController");

router.post("/register", userController.Register); // using controller for registering user
router.post("/login", userController.Login); // using controller for logging in user
router.get("/get/:id", userController.Get); // using controller for getting user by id

module.exports = router;
