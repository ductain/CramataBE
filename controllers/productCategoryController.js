const ProductCategories = require("../models/ProductCategories");

class ProductCategoryController {
    async getAll(req, res, next) {
        ProductCategories.find({})
            .then((categories) => {
                res.status(200).json(categories)
            })
            .catch(err => {
                return res.status(500).json({ error: "Không tìm thấy loại sản phẩm nào" });
            })
    };
    async create(req, res, next) {
        try {
            const category = await ProductCategories.findOne({ name: req.body.name });
            if (category) {
                return res.status(400).json({ error: "Loại sản phẩm đã tồn tại!" });
            }
            const newCategory = await ProductCategories.create(req.body);
            res.status(200).json('Tạo loại sản phẩm thành công');
        } catch (err) {
            return res.status(500).json({ error: "Có lỗi xảy ra" });
        }
    };
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const productCategory = await ProductCategories.findById(id);

            if (!productCategory) {
                return res.status(404).json({ error: "Loại sản phẩm không tồn tại" });
            };

            const updatedProductCategory = await ProductCategories.findByIdAndUpdate(
                id,
                {
                    name,
                },
                { new: true }
            );
            res
                .status(200)
                .json({ data: updatedProductCategory, message: "Cập nhật loại sản phẩm thành công" });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new ProductCategoryController();