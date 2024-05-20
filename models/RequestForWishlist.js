const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestForWishlistSchema = new Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requests",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  },
  { timestamps: true }
);

const RequestForWishlists = mongoose.model("RequestForWishlists", requestForWishlistSchema);
module.exports = RequestForWishlists;
