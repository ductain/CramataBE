const ProductCategories = require("../models/ProductCategories");

class ProductCategoryController {
    async getAll() {
        ProductCategories.find({})
            .then((category) => {
                res.status(200).json(category)
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    }
}

export default ProductCategoryController;