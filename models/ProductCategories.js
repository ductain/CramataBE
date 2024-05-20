const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductCategories = mongoose.model("ProductCategories", productCategorySchema);
module.exports = ProductCategories;
