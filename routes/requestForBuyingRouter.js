const express = require("express");
const requestForBuyingController = require("../controllers/requestForBuyingController");

const requestForBuyingRouter = express.Router();

requestForBuyingRouter.route("/").get(requestForBuyingController.getAll);
requestForBuyingRouter.route("/").post(requestForBuyingController.create);

module.exports = requestForBuyingRouter;