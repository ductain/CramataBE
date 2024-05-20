const express = require("express");
const accountController = require('../controllers/accountController')

const accountRouter = express.Router();
accountRouter
  .route("/user/register")
  .post(accountController.register)

  module.exports = accountRouter;
