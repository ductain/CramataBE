const RequestForCustomProduct = require("../models/RequestForCustomProduct");

class RequestForCustomProductController {
  async getAll(req, res, next) {
    RequestForCustomProduct.find({})
      .then((request) => {
        res.status(200).json({ requests: request });
      })
      .catch((err) => {
        next(err);
      });
  }

  async create(req, res, next) {
    RequestForCustomProduct.create(req.body)
      .then((request) => {
        res.status(200).json({ message: "Tạo mới thành công" });
      })
      .catch((err) => {
        return res.status(401).json({ error: "Tạo mới thất bại" });
      });
  }
}

module.exports = new RequestForCustomProductController();