const Router = require("express");
const router = new Router();
const userRouter = require("./UserRoutes");

router.use("/user", userRouter);

module.exports = router;
