const express = require("express");
const notificationController = require('../controllers/notificationController')

const notificationRouter = express.Router();
notificationRouter
    .route("/notifications")
    .get(notificationController.getAll)

module.exports = notificationRouter;
