const express = require("express");
const taskController = require("../controllers/taskController");

const taskRouter = express.Router();
taskRouter.route("/")
    .get(taskController.getAllTask)
    .post(taskController.createTask);

taskRouter.route("/parent").get(taskController.getTasksByParentId);
taskRouter.route("/children").get(taskController.getTasksByChildId);

taskRouter.route("/:id").put(taskController.updateTask);
taskRouter.route("/status/:id").put(taskController.updateStatusOfTask);

module.exports = taskRouter;