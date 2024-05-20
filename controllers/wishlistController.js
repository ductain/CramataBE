const Wishlist = require("../models/WishList");

class WishlistController {
    async getAll(req, res, next) {
        Wishlist.find({})
            .then((wishlist) => {
                res.status(200).json(wishlist)
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    }
    async create(req, res, next) {
        Wishlist.create(req.body)
            .then((wishlistItem) => {
                res.status(200).json('Item added into wishlist');
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    };
}

export default WishlistController;