// current route is http://localhost:2492/api/photo
const Route = require("express");
const route = new Route();

const PhotoController = require("../controller/PhotoController");

route.post("/upload", PhotoController.upload);
route.get("/getOne/:id", PhotoController.getPhoto);
route.get("/getAll", PhotoController.getAll);
route.get("/getAllUserPhotos/:user_id", PhotoController.getAllUserPhotos);

module.exports = route;
