const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategories",
        require: true,
    },
    image: {
      type: String,
    },
    link: {
      type: String,
    },
    points: {
      type: Number,
      required: true,
    },
    isInShop: {
      type: Boolean,
      required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accounts",
        require: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
