const express = require("express");
const pointController = require("../controllers/pointController");

const pointRouter = express.Router();
pointRouter.route("/")
    .get(pointController.getAll)
    .post(pointController.create);

pointRouter.route("/:id")
    .get(pointController.getByPointId)
    .put(pointController.updateByPointId);


pointRouter.route("/child/:childId")
    .get(pointController.getByChildId)
    .put(pointController.updateByChildId);

module.exports = pointRouter;