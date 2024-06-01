const Points = require("../models/Points");

class PointController {
    async getAll(req, res, next) {
        Points.find({})
            .then((points) => {
                res.status(200).json(points)
            })
            .catch(err => {
                return res.status(500).json({ error: "Chưa có dữ liệu" });
            })
    };
    async getByPointId(req, res, next) {
        Points.findById(req.params.id)
            .then((point) => {
                res.status(200).json(point)
            })
            .catch(err => {
                return res.status(500).json({ error: "Chưa có dữ liệu" });
            })
    };
    async create(req, res, next) {
        Points.create(req.body)
            .then((point) => {
                res.status(200).json('Khởi tạo điểm cho bé thành công');
            })
            .catch(err => {
                return res.status(401).json({ error: "Khởi tạo điểm thất bại" });
            })
    };
    async updateByPointId(req, res, next) {
        try {
            const { id } = req.params;
            const { points } = req.body;
            const point = await Points.findById(id);

            if (!point) {
                return res.status(404).json({ error: "Không tìm thấy điểm" });
            }

            const updatedPoint = await Points.findByIdAndUpdate(
                id,
                {
                    ...points,
                },
                { new: true }
            );
            res
                .status(200)
                .json({ data: updatedPoint, message: "Cập nhật điểm thành công" });
        } catch (err) {
            next(err);
        }
    };
    //With childId
    async getByChildId(req, res, next) {
        Points.findOne({ childId: req.params.childId })
            .then((point) => {
                res.status(200).json(point)
            })
            .catch(err => {
                return res.status(500).json({ error: "Không tìm thấy điểm của bé" });
            })
    };
    async updateByChildId(req, res, next) {
        try {
            const childId = req.params.childId;
            const { points } = req.body;
            const point = await Points.findOne({ childId: childId});

            if (!point) {
                return res.status(404).json({ error: "Không tìm thấy điểm của bé" });
            }

            const updatedPoint = await Points.findOneAndUpdate(
                { childId: childId },
                { $set: { points: points } },
                { new: true }
            );

            res
                .status(200)
                .json({ data: updatedPoint, message: "Điểm bé đã được cập nhật" });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new PointController();