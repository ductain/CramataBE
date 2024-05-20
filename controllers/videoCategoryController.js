const VideoCategories = require("../models/VideoCategories");

class VideoCategoriesController {
    async getAll(req, res, next) {
        VideoCategories.find({})
            .then((categories) => {
                res.status(200).json(categories)
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    }
    async create(req, res, next) {
        VideoCategories.create(req.body)
            .then((category) => {
                res.status(200).json('Video category created');
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    };
}

export default VideoCategoriesController;