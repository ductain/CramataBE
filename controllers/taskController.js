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
  async getTasksByParentId(req, res, next) {
    let data = [];
    const {parentId} = req.query;
    try {
      data = await Tasks.find({ parentId: parentId }).populate("parentId").populate("childId");
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

      res.status(201).json({ data: newTask, message: "Nhiệm vụ đã được giao" });
    } catch (err) {
      next(err);
    }
  }
  async updateTask(req, res, next) {
    try {
      const { id } = req.params;
      const { parentId, childId, name, points, note, assignedDate, status } = req.body;
      const task = await Tasks.findById(id);

      if (!task) {
        return res.status(404).json({ error: "Nhiệm vụ không tồn tại" });
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
          status
        },
        { new: true }
      );
      res
        .status(200)
        .json({ data: updatedTask, message: "Cập nhật nhiệm vụ thành công" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TaskController();
