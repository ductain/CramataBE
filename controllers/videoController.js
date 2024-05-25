const Videos = require("../models/Videos");

class VideoController {
  async getAll(req, res, next) {
    Videos.find({})
      .populate('VideoCategories')
      .then((videos) => {
        res.status(200).json(videos)
      })
      .catch(err => {
        return res.status(500).json({ error: "Hiện không có video" });
      })
  };
  async create(req, res, next) {
    Videos.create(req.body)
      .then((video) => {
        res.status(200).json('Khởi tạo video thành công');
      })
      .catch(err => {
        return res.status(401).json({ error: "Khởi tạo video thất bại" });
      })
  };
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { videoUrl, name, category, points } = req.body;
      const video = await Videos.findById(id);

      if (!video) {
        return res.status(404).json({ error: "Không tìm thấy video" });
      }

      const updatedVideo = await Videos.findByIdAndUpdate(
        id,
        {
          videoUrl,
          name,
          category,
          points,
        },
        { new: true }
      );
      res
        .status(200)
        .json({ data: updatedVideo, message: "Cập nhật video thành công" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new VideoController();