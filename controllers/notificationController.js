const Notifications = require("../models/Notifications");

class NotificationController {
    async getAll(req, res, next) {
        Notifications.find({})
            .then((notifications) => {
                res.status(200).json(notifications)
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    }
    async create(req, res, next) {
        Notifications.create(req.body)
            .then((notification) => {
                res.status(200).json('Notification created');
            })
            .catch(err => {
                res.status(500).json('Error:' + err.message)
            })
    };
}

export default NotificationController;