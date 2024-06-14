const Request = require("../models/Request");
const RequestForBuying = require("../models/RequestForBuying");
const RequestForCustomProduct = require("../models/RequestForCustomProduct");
const RequestForWishlist = require("../models/RequestForWishlist");
const Wishlist = require("../models/WishList");
const Points = require("../models/Points");
const Product = require("../models/Products");

class RequestController {
  async getAll(req, res, next) {
    Request.find({})
      .then((request) => {
        res.status(200).json({ requests: request });
      })
      .catch((err) => {
        next(err);
      });
  }

  async getRequestByParentId(req, res, next) {
    const id = req.query.id;
    Request.find({ parentId: id }).then((request) => {
      if (request.length === 0) {
        res.status(400).json({ error: "Không có yêu cầu nào" });
      } else {
        res.status(200).json({ requests: request });
      }
    });
  }

  async getDetail(req, res, next) {
    try {
      const requestId = req.query.id;

      // Get the request document
      const request = await Request.findById(requestId);

      if (!request) {
        return res.status(404).json({ error: "Không tìm thấy yêu cầu" });
      }

      // Determine the request type and fetch the corresponding detailed document
      let detailDocument;
      switch (request.requestType) {
        case "RequestForBuying":
          detailDocument = await RequestForBuying.findOne({
            request: requestId,
          }).populate("product");
          break;
        case "RequestForCustomProduct":
          detailDocument = await RequestForCustomProduct.findOne({
            request: requestId,
          });
          break;
        case "RequestForWishlist":
          detailDocument = await RequestForWishlist.findOne({
            request: requestId,
          }).populate("product");
          break;
        default:
          return res.status(400).json({ error: "Invalid request type" });
      }

      // Combine the request and detail document data
      const responseData = {
        ...request.toObject(),
        detail: detailDocument?.toObject(),
      };

      res.status(200).json(responseData);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    Request.create(req.body)
      .then((request) => {
        res.status(200).json({ message: "Tạo mới thành công" });
      })
      .catch((err) => {
        return res.status(401).json({ error: "Tạo mới thất bại" });
      });
  }

  async createRequestForCustomProduct(req, res, next) {
    try {
      const { childId, parentId, productName, description } = req.body;

      // Validate the input
      if (!productName || !description) {
        return res.status(400).json({ error: "Xin hãy nhập tất cả thông tin" });
      }

      const newRequest = new Request({
        requestType: "RequestForCustomProduct",
        childId: childId,
        parentId: parentId,
      });

      const savedRequest = await newRequest.save();

      const newRequestForCustomProduct = new RequestForCustomProduct({
        request: savedRequest._id,
        productName: productName,
        description: description,
      });

      await newRequestForCustomProduct.save();

      res.status(200).json({
        message: "Tạo yêu cầu thành công",
      });
    } catch (err) {
      next(err);
    }
  }

  async createRequestForWishlist(req, res, next) {
    try {
      const { childId, parentId, productId } = req.body;

      const newRequest = new Request({
        requestType: "RequestForWishlist",
        childId: childId,
        parentId: parentId,
      });

      const savedRequest = await newRequest.save();

      const newRequestForWishlist = new RequestForWishlist({
        request: savedRequest._id,
        product: productId,
      });

      await newRequestForWishlist.save();

      res.status(200).json({
        message: "Tạo yêu cầu thành công",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateRequestForWishlistStatus(req, res, next) {
    try {
      const { status } = req.body;
      const { requestId } = req.query;

      // Validate the input
      if (!requestId || !status) {
        return res.status(400).json({ error: "Missing request ID or status" });
      }

      // Check if the status is either 'Approved' or 'Denied'
      if (status !== "Approved" && status !== "Denied") {
        return res
          .status(400)
          .json({ error: "Invalid status. Must be 'Approved' or 'Denied'." });
      }

      // Find the request for wishlist
      const requestForWishlist = await RequestForWishlist.findById(
        requestId
      ).populate("request");

      if (!requestForWishlist) {
        return res.status(404).json({ error: "Không tìm thấy yêu cầu" });
      }

      // Update the status of the request
      const updatedRequest = await Request.findByIdAndUpdate(
        requestForWishlist.request._id,
        { status: status },
        { new: true }
      );

      if (status === "Approved") {
        // Create a new wishlist item
        const newWishlistItem = new Wishlist({
          product: requestForWishlist.product,
          childId: updatedRequest.childId,
        });

        await newWishlistItem.save();
        res.status(200).json({ message: "Đã chấp nhận yêu cầu" });
      } else {
        res.status(200).json({ message: "Yêu cầu bị huỷ" });
      }
    } catch (err) {
      next(err);
    }
  }

  async createRequestForBuying(req, res, next) {
    try {
      const { childId, parentId, productId } = req.body;

      const newRequest = new Request({
        requestType: "RequestForBuying",
        childId: childId,
        parentId: parentId,
      });

      const savedRequest = await newRequest.save();

      const newRequestForWishlist = new RequestForBuying({
        request: savedRequest._id,
        product: productId,
      });

      await newRequestForWishlist.save();

      res.status(200).json({
        message: "Tạo yêu cầu thành công",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateRequestForBuyingStatus(req, res, next) {
    try {
      const { status } = req.body;
      const { requestId } = req.query;

      // Validate the input
      if (!requestId || !status) {
        return res.status(400).json({ error: "Missing request ID or status" });
      }

      // Check if the status is either 'Approved' or 'Denied'
      if (status !== "Approved" && status !== "Denied") {
        return res
          .status(400)
          .json({ error: "Invalid status. Must be 'Approved' or 'Denied'." });
      }

      // Find the request for buying
      const requestForBuying = await RequestForBuying.findById(requestId)
        .populate("request")
        .populate("product");

      if (!requestForBuying) {
        return res.status(404).json({ error: "Không tìm thấy yêu cầu" });
      }

      // Update the status of the request
      const updatedRequest = await Request.findByIdAndUpdate(
        requestForBuying.request._id,
        { status: status },
        { new: true }
      );

      if (status === "Approved") {
        // Deduct the points from the child's points
        const childPointsRecord = await Points.findOne({
          childId: updatedRequest.childId,
        });
        if (
          childPointsRecord &&
          typeof childPointsRecord.points === "number" &&
          requestForBuying.product &&
          typeof requestForBuying.product.points === "number"
        ) {
          // Deduct the points from the child's points
          const newPoints =
            childPointsRecord.points - requestForBuying.product.points;
          if (!isNaN(newPoints)) {
            childPointsRecord.points = newPoints;
            await childPointsRecord.save();
          } else {
            return res
              .status(400)
              .json({ error: "Failed to calculate new points value." });
          }
        } else {
          return res.status(400).json({ error: "Invalid points data." });
        }

        // Delete the wishlist item with the specified productId and childId
        await Wishlist.findOneAndDelete({
          product: requestForBuying.product._id,
          childId: updatedRequest.childId,
        });
        res.status(200).json({ message: "Đã chấp nhận yêu cầu" });
      } else {
        res.status(200).json({ message: "Yêu cầu bị huỷ" });
      }
    } catch (err) {
      next(err);
    }
  }
  async updateRequestForCustomProductStatus(req, res, next) {
    try {
      const { status, image, points, createdBy } = req.body;
      const { requestId } = req.query;

      // Validate the input
      if (!requestId || !status) {
        return res.status(400).json({ error: "Missing request ID or status" });
      }

      // Check if the status is either 'Approved' or 'Denied'
      if (status !== "Approved" && status !== "Denied") {
        return res
          .status(400)
          .json({ error: "Invalid status. Must be 'Approved' or 'Denied'." });
      }

      // Find the request for custom product
      const requestForCustomProduct = await RequestForCustomProduct.findById(
        requestId
      ).populate("request");

      if (!requestForCustomProduct) {
        return res.status(404).json({ error: "Request not found" });
      }

      // Update the status of the request
      const updatedRequest = await Request.findByIdAndUpdate(
        requestForCustomProduct.request._id,
        { status: status },
        { new: true }
      );

      if (status === "Approved") {
        // Create a new product
        const newProduct = new Product({
          name: requestForCustomProduct.productName,
          category: "66686c19355ac59ce927c9e9",
          image: image,
          createdBy: createdBy,
          points: points,
          isInShop: false,
        });

        const savedProduct = await newProduct.save();

        // Create a new wishlist item with the childId from the request and productId of the newly created product
        const newWishlistItem = new Wishlist({
          childId: updatedRequest.childId,
          product: savedProduct._id,
        });

        await newWishlistItem.save();

        res.status(200).json({ message: "Tạo yêu cầu thành công" });
      } else {
        res.status(200).json({ message: "Đã huỷ yêu cầu" });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RequestController();
