const express = require("express");
const productController = require('../controllers/productController')

const productRouter = express.Router();
productRouter
  .route("/products")
  .get(productController.getAll)

module.exports = productRouter;
