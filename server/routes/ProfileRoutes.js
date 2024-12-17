// heres qurery is http://localhost:2492/api/profile

const Router = require("express");
const router = new Router();

const ProfileController = require("../controller/ProfileController"); // importing controller

router.post("/settings/image/:id", ProfileController.setProfileImage); // using controller for uploading image

module.exports = router;
