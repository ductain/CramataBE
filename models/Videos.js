const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var videoSchema = new Schema(
  {
    videoUrl: {
      type: String,
      required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VideoCategories",
        require: true,
    },
    points: {
        type: Number,
        required: true,
    },
  },
  { timestamps: true }
);

const Videos = mongoose.model("Videos", videoSchema);
module.exports = Videos;
