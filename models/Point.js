const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointSchema = new Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Points = mongoose.model("Points", pointSchema);
module.exports = Points;