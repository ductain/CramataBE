const express = require("express");
const requestForWishlistController = require("../controllers/requestForWistlistController");

const requestForWishlistRouter = express.Router();

requestForWishlistRouter.route("/").get(requestForWishlistController.getAll);
requestForWishlistRouter.route("/").post(requestForWishlistController.create);

module.exports = requestForWishlistRouter;