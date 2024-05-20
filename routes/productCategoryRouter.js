const express = require("express");
const productCategoryController = require('../controllers/productCategoryController')

const productCategoryRouter = express.Router();
productCategoryRouter
  .route("/productCategories")
  .get(productCategoryController.getAll)

module.exports = productCategoryRouter;