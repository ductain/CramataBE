const express = require("express");
const videoCategoryController = require('../controllers/videoCategoryController')

const videoCategoryRouter = express.Router();
videoCategoryRouter
    .route("/")
    .get(videoCategoryController.getAll)
    .post(videoCategoryController.create)

videoCategoryRouter.route("/:id").put(videoCategoryController.update);

module.exports = videoCategoryRouter;
