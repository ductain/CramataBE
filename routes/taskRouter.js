const express = require("express");
const taskController = require("../controllers/taskController");

const taskRouter = express.Router();
taskRouter.route("/")
    .get(taskController.getAllTask)
    .post(taskController.createTask);

taskRouter.route("/parent").get(taskController.getTasksByParentId);

taskRouter.route("/:id").put(taskController.updateTask);

module.exports = taskRouter;