const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestForBuyingSchema = new Schema(
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

const RequestForBuyings = mongoose.model("RequestForBuyings", requestForBuyingSchema);
module.exports = RequestForBuyings;