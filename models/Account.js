const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var accountSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      uniqued: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "Parent",
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const Accounts = mongoose.model("Accounts", accountSchema);
module.exports = Accounts;
