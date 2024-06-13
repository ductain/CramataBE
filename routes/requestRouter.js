const express = require("express");
const requestController = require("../controllers/requestController");

const requestRouter = express.Router();

requestRouter.route("/").get(requestController.getAll);
requestRouter.route("/requestDetail").get(requestController.getDetail);
requestRouter.route("/requestOfParent").get(requestController.getRequestByParentId);
requestRouter.route("/").post(requestController.create);
requestRouter.route("/requestForCustomProduct").post(requestController.createRequestForCustomProduct);
requestRouter.route("/requestForWishlist").post(requestController.createRequestForWishlist);
requestRouter.route("/requestForBuying").post(requestController.createRequestForBuying);
requestRouter.route("/updateRequestForWishlistStatus").put(requestController.updateRequestForWishlistStatus);
requestRouter.route("/updateRequestForBuyingStatus").put(requestController.updateRequestForBuyingStatus);

module.exports = requestRouter;
