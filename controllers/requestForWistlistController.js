const RequestForWishlist = require("../models/RequestForWishlist");

class RequestForWishlistController {
  async getAll(req, res, next) {
    RequestForWishlist.find({})
      .then((request) => {
        res.status(200).json({ requests: request });
      })
      .catch((err) => {
        next(err);
      });
  }

  async create(req, res, next) {
    RequestForWishlist.create(req.body)
      .then((request) => {
        res.status(200).json({ message: "Tạo mới thành công" });
      })
      .catch((err) => {
        return res.status(401).json({ error: "Tạo mới thất bại" });
      });
  }
}

module.exports = new RequestForWishlistController();