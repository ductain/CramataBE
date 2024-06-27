const Products = require("../models/Products");

class ProductController {
    async getAll(req, res, next) {
        Products.find({})
            .populate('category')
            .then((products) => {
                res.status(200).json(products)
            })
            .catch(err => {
                return res.status(500).json({ error: "Không tìm thấy sản phẩm nào" });
            })
    }
    async create(req, res, next) {
        try {
            if (req.body.isInShop) {
                const product = await Products.findOne({ name: req.body.name, isInShop: true });
                if (product) {
                    return res.status(400).json({ error: "Sản phẩm trùng tên!" });
                }
            }
            const newProduct = await Products.create(req.body);
            res.status(200).json('Tạo sản phẩm thành công');
        } catch (err) {
            return res.status(500).json({ error: "Có lỗi xảy ra" });
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, category, image, link, points, isInShop, createdBy, status } = req.body;
            const product = await Products.findById(id);

            if (!product) {
                return res.status(404).json({ error: "Sản phẩm không tồn tại" });
            };

            const updatedProduct = await Products.findByIdAndUpdate(
                id,
                {
                    name,
                    category,
                    image,
                    link,
                    points,
                    isInShop,
                    createdBy,
                    status
                },
                { new: true }
            );
            res
                .status(200)
                .json({ data: updatedProduct, message: "Cập nhật sản phẩm thành công" });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new ProductController();