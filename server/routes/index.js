//heres qurery is http://localhost:2492/api
//main router file

const Router = require("express");
const router = new Router(); // creating router

const userRouter = require("./UserRoutes"); // importing routes
const ProfileRouter = require("./ProfileRoutes");
const PhotoRouter = require("./PhotoRoute");
const SocialRouter = require("./SocialRoute");

router.use("/user", userRouter); // using routes for user
router.use("/profile", ProfileRouter); // using routes for profile
router.use("/photo", PhotoRouter); // using routes for photo
router.use("/social", SocialRouter); // using routes for social

module.exports = router;
