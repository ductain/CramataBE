const express = require("express");
const productCategoryController = require('../controllers/productCategoryController')

const productCategoryRouter = express.Router();
productCategoryRouter
  .route("/")
  .get(productCategoryController.getAll)
  .post(productCategoryController.create)

productCategoryRouter.route("/:id").put(productCategoryController.update);

module.exports = productCategoryRouter;
