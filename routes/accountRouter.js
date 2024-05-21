const express = require("express");
const accountController = require("../controllers/accountController");

const accountRouter = express.Router();
accountRouter.route("/user/register").post(accountController.register);
accountRouter.route("/user/login").post(accountController.login);

module.exports = accountRouter;
