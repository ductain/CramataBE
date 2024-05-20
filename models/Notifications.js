const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var notificationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      require: true,
    },
    notiType: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Notifications = mongoose.model("Notifications", notificationSchema);
module.exports = Notifications;
