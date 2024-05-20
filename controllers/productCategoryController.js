const ProductCategories = require("../models/ProductCategories");

class ProductCategoryController {
    async getAll(req, res, next) {
        ProductCategories.find({})
            .then((categories) => {
                res.status(200).json(categories)
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    }
    async create(req, res, next) {
        ProductCategories.create(req.body)
            .then((category) => {
                res.status(200).json('Product category created');
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    };
}

export default ProductCategoryController;