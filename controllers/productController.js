const Products = require("../models/Products");

class ProductController {
    async getAll(req, res, next) {
        Products.find({})
            .then((products) => {
                res.status(200).json(products)
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    }
    async create(req, res, next) {
        Products.create(req.body)
            .then((product) => {
                res.status(200).json('Product created');
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    };
}

export default ProductController;