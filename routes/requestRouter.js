const express = require("express");
const requestController = require("../controllers/requestController");

const requestRouter = express.Router();

requestRouter.route("/").get(requestController.getAll);
requestRouter.route("/requestOfParent").get(requestController.getRequestByParentId);
requestRouter.route("/create").post(requestController.create);

module.exports = requestRouter;
