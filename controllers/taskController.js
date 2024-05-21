const Tasks = require("../models/Task");

class TaskController {
  async getAllTask(req, res, next) {
    let data = [];

    try {
      data = await Tasks.find({}).populate("parentId").populate("childId");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  async createTask(req, res, next) {
    try {
      const { parentId, childId, name, points, note, assignedDate } = req.body;

      const newTask = new Tasks({
        parentId,
        childId,
        name,
        points,
        note,
        assignedDate,
      });

      await newTask.save();

      res.status(201).json({ data: newTask, message: "Tạo mới thành công" });
    } catch (err) {
      next(err);
    }
  }
  async updateTask(req, res, next) {
    try {
      const { id } = req.params;
      const { parentId, childId, name, points, note, assignedDate } = req.body;
      const task = await Tasks.findById(id);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      const updatedTask = await Tasks.findByIdAndUpdate(
        id,
        {
          parentId,
          childId,
          name,
          points,
          note,
          assignedDate,
        },
        { new: true }
      );
      res
        .status(200)
        .json({ data: updatedTask, message: "Cập nhật thành công" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TaskController();