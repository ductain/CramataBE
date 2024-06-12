const Tasks = require("../models/Task");

class TaskController {
  async getAllTask(req, res, next) {
    let data = [];

    try {
      data = await Tasks.find({}).populate("parentId").populate("childId");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({error: error.message});
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
      res.status(404).json({ error: "Không tìm thấy nhiệm vụ nào" });
    }
  }
  async getTasksByChildId(req, res, next) {
    let data = [];
    const {childId} = req.query;
    try {
      data = await Tasks.find({ childId: childId });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Không tìm thấy nhiệm vụ nào" });
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
      res.status(400).json({ error: "Tạo nhiệm vụ thất bại" });
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
      return res.status(400).json({ error: "Có lỗi xảy ra trong quá trình cập nhật nhiệm vụ" });
    }
  }
}

module.exports = new TaskController();
