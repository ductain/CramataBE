const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestForCustomProductSchema = new Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requests",
      required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

const RequestForCustomProducts = mongoose.model("RequestForCustomProducts", requestForCustomProductSchema);
module.exports = RequestForCustomProducts;