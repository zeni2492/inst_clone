//heres qurery is http://localhost:2492/api
//main router file

const Router = require("express");
const router = new Router(); // creating router

const userRouter = require("./UserRoutes"); // importing routes
const ProfileRouter = require("./ProfileRoutes");

router.use("/user", userRouter); // using routes for user
router.use("/profile", ProfileRouter); // using routes for profile

module.exports = router;
