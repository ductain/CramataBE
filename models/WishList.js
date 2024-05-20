const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var wishlistSchema = new Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            require: true,
        },
        childId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Accounts",
            require: true,
        },
    },
    { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
