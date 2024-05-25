const express = require("express");
const videoController = require('../controllers/videoController')

const videoRouter = express.Router();
videoRouter
    .route("/")
    .get(videoController.getAll)
    .post(videoController.create)

videoRouter.route("/:id").put(videoController.update);

module.exports = videoRouter;
