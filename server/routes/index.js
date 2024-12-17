const Router = require("express");
const router = new Router();
const userRouter = require("./UserRoutes");
const ProfileRouter = require("./ProfileRoutes");

router.use("/user", userRouter);
router.use("/profile", ProfileRouter);

module.exports = router;
