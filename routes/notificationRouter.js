const express = require("express");
const notificationController = require('../controllers/notificationController')

const notificationRouter = express.Router();
notificationRouter
    .route("/notifications")
    .get(notificationController.getAll)
    .post(notificationController.create)

module.exports = notificationRouter;
