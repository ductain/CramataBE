const express = require("express");
const videoController = require('../controllers/videoController')

const videoRouter = express.Router();
videoRouter
    .route("/videos")
    .get(videoController.getAll)

module.exports = videoRouter;
