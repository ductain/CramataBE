const VideoCategories = require("../models/VideoCategories");

class VideoCategoriesController {
    async getAll(req, res, next) {
        VideoCategories.find({})
            .then((categories) => {
                res.status(200).json(categories)
            })
            .catch(err => {
                return res.status(401).json({ error: "Hiện không có loại video nào" });
            })
    };
    async create(req, res, next) {
        VideoCategories.create(req.body)
            .then((category) => {
                res.status(200).json('Tạo loại video mới thành công');
            })
            .catch(err => {
                return res.status(401).json({ error: "Khởi tạo loại video thất bại" });
            })
    };
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const videoCategory = await VideoCategories.findById(id);
      
            if (!videoCategory) {
              return res.status(404).json({ error: "Không tìm thấy loại video này" });
            };
      
            const updatedVideoCategory = await VideoCategories.findByIdAndUpdate(
              id,
              {
                name,
              },
              { new: true }
            );
            res
              .status(200)
              .json({ data: updatedVideoCategory, message: "Cập nhật loại video thành công" });
          } catch (err) {
            next(err);
          }
    };
}

module.exports = new VideoCategoriesController();