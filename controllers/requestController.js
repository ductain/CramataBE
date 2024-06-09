const Request = require("../models/Request");
const RequestForBuying = require("../models/RequestForBuying");
const RequestForCustomProduct = require("../models/RequestForCustomProduct");
const RequestForWishlist = require("../models/RequestForWishlist");

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
}

module.exports = new RequestController();
