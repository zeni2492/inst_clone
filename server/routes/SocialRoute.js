// current route is http://localhost:2492/api/social

const Router = require("express");
const router = new Router();

const SocialController = require("../controller/SocialController");

router.post("/setLike", SocialController.Like);
router.post("/unsetLike", SocialController.Unlike);
router.post("/subscribe/:id", SocialController.Subscribe);
router.post("/unsubscribe/:id", SocialController.Unsubscribe);

router.get("/getSubscribers/:id", SocialController.getSubscribers);
router.get("/getSubscriptions/:id", SocialController.getSubscriptions);

module.exports = router;
