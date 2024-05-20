const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var videoCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const VideoCategories = mongoose.model("VideoCategories", videoCategorySchema);
module.exports = VideoCategories;
