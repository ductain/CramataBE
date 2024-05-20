const Videos = require("../models/Videos");

class VideoController {
    async getAll(req, res, next) {
        Videos.find({})
            .then((videos) => {
                res.status(200).json(videos)
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    }
    async create(req, res, next) {
        Videos.create(req.body)
            .then((video) => {
                res.status(200).json('Video created');
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    };
}

export default VideoController;