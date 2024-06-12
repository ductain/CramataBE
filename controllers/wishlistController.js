const Wishlist = require("../models/WishList");

class WishlistController {
  async getAll(req, res, next) {
    Wishlist.find({})
      .then((wishlist) => {
        res.status(200).json(wishlist);
      })
      .catch((err) => {
        res.status(500).json("Error:" + err.message);
      });
  }
  async create(req, res, next) {
    Wishlist.create(req.body)
      .then((wishlistItem) => {
        res.status(200).json("Item added into wishlist");
      })
      .catch((err) => {
        res.status(500).json("Error:" + err.message);
      });
  }
  async getWishlistByChildId(req, res, next) {
    const { childId } = req.query;
    Wishlist.find({ childId: childId })
      .populate("product")
      .then((wishlist) => {
        if (wishlist.length === 0) {
          res
            .status(400)
            .json({ error: "Không có sản phẩm nào trong wishlist" });
        } else {
          res.status(200).json({ wishlists: wishlist });
        }
      });
  }
}

module.exports = new WishlistController();
