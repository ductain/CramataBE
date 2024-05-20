const express = require("express");
const productController = require('../controllers/productController')

const productRouter = express.Router();
productRouter
  .route("/products")
  .get(productController.getAll)
  .post(productController.create)

module.exports = productRouter;
