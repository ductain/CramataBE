const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: true,
    },
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    assignedDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", taskSchema);
module.exports = Tasks;