const express = require("express");
const requestForCustomProductController = require("../controllers/requestForCustomProductController");

const requestForCustomProductRouter = express.Router();

requestForCustomProductRouter.route("/").get(requestForCustomProductController.getAll);
requestForCustomProductRouter.route("/").post(requestForCustomProductController.create);

module.exports = requestForCustomProductRouter;