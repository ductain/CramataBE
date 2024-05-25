const express = require("express");
const productController = require('../controllers/productController')

const productRouter = express.Router();
productRouter
  .route("/")
  .get(productController.getAll)
  .post(productController.create)

productRouter.route("/:id").put(productController.update);

module.exports = productRouter;
