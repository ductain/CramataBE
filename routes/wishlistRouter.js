const express = require("express");
const wishlistController = require("../controllers/wishlistController");

const wishlistRouter = express.Router();
wishlistRouter
  .route("/")
  .get(wishlistController.getAll)
  .post(wishlistController.create);
wishlistRouter
  .route("/wishlistOfChild")
  .get(wishlistController.getWishlistByChildId);

module.exports = wishlistRouter;
