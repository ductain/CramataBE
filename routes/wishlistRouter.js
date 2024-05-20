const express = require("express");
const wishlistController = require('../controllers/wishlistController')

const wishlistRouter = express.Router();
wishlistRouter
    .route("/wishlist")
    .get(wishlistController.getAll)

module.exports = wishlistRouter;