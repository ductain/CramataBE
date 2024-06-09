const express = require("express");
const requestController = require("../controllers/requestController");

const requestRouter = express.Router();

requestRouter.route("/").get(requestController.getAll);
requestRouter.route("/requestDetail").get(requestController.getDetail);
requestRouter.route("/requestOfParent").get(requestController.getRequestByParentId);
requestRouter.route("/").post(requestController.create);
requestRouter.route("/requestForCustomProduct").post(requestController.createRequestForCustomProduct);

module.exports = requestRouter;
