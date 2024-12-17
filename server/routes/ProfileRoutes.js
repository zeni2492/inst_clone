const Router = require("express");
const router = new Router();
const ProfileController = require("../controller/ProfileController");

router.post("/settings/image/:id", ProfileController.setProfileImage);

module.exports = router;
