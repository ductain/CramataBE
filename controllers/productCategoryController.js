const ProductCategories = require("../models/ProductCategories");

class ProductCategoryController {
    async getAll(req, res, next) {
        ProductCategories.find({})
            .then((categories) => {
                res.status(200).json(categories)
            })
            .catch(err => {
                res.status(500).json('Có lỗi xảy ra:' + err.message)
            })
    }
    async create(req, res, next) {
        ProductCategories.create(req.body)
            .then((category) => {
                res.status(200).json('Tạo mới thành công loại sản phẩm');
            })
            .catch(err => {
                res.status(500).json('Có lỗi xảy ra:' + err.message)
            })
    };
}

export default ProductCategoryController;