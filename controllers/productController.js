const Products = require("../models/Products");

class ProductController {
    async getAll(req, res, next) {
        Products.find({})
            .then((products) => {
                res.status(200).json(products)
            })
            .catch(err => {
                res.status(500).json('Có lỗi xảy ra:' + err.message)
            })
    }
    async create(req, res, next) {
        if (req.body.isInShop) {
            Products.findOne({ name: req.body.name, isInShop: true })
                .then((products) => {
                    res.status(500).json('Sản phẩm trùng tên!');
            })
        }
        Products.create(req.body)
            .then((product) => {
                res.status(200).json('Tạo sản phẩm thành công');
            })
            .catch(err => {
                res.status(500).json('Có lỗi xảy ra:' + err.message)
            })
    };
}

export default ProductController;