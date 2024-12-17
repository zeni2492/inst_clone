const Router = require("express");
const router = new Router();
const userController = require("../controller/UserController");

router.post("/register", userController.Register);
router.post("/login", userController.Login);
router.get("/get/:id", userController.Get);

router.get("/register", (req, res) => {
    res.send("register");
});
module.exports = router;
