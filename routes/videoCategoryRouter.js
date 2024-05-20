const express = require("express");
const videoCategoryController = require('../controllers/videoCategoryController')

const videoCategoryRouter = express.Router();
videoCategoryRouter
    .route("/videoCategories")
    .get(videoCategoryController.getAll)
    .post(videoCategoryController.create)

module.exports = videoCategoryRouter;
