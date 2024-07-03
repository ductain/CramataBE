const express = require("express");
const notificationController = require('../controllers/notificationController')

const notificationRouter = express.Router();
notificationRouter
    .route("/")
    .get(notificationController.getAll)
    .post(notificationController.create)
notificationRouter
    .route("/childNoti")
    .get(notificationController.getByChildId)

module.exports = notificationRouter;
