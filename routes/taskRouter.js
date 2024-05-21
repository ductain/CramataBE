const express = require("express");
const taskController = require("../controllers/taskController");

const taskRouter = express.Router();
taskRouter.route("/").get(taskController.getAllTask);
taskRouter.route("/").post(taskController.createTask);
taskRouter.route("/:id").put(taskController.updateTask);

module.exports = taskRouter;