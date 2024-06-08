const RequestForBuying = require("../models/RequestForBuying");

class RequestForBuyingController {
  async getAll(req, res, next) {
    RequestForBuying.find({})
      .then((request) => {
        res.status(200).json({ requests: request });
      })
      .catch((err) => {
        next(err);
      });
  }

  async create(req, res, next) {
    RequestForBuying.create(req.body)
      .then((request) => {
        res.status(200).json({ message: "Tạo mới thành công" });
      })
      .catch((err) => {
        return res.status(401).json({ error: "Tạo mới thất bại" });
      });
  }
}

module.exports = new RequestForBuyingController();
