const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    requestType: {
      type: String,
      required: true,
    },
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Requests = mongoose.model("Requests", requestSchema);
module.exports = Requests;