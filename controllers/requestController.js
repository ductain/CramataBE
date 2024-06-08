const Request = require("../models/Request");

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

  async create(req, res, next) {
    Request.create(req.body)
      .then((request) => {
        res.status(200).json({ message: "Tạo mới thành công" });
      })
      .catch((err) => {
        return res.status(401).json({ error: "Tạo mới thất bại" });
      });
  }
}

module.exports = new RequestController();
