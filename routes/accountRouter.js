const express = require("express");
const accountController = require("../controllers/accountController");

const accountRouter = express.Router();
accountRouter.route("/user/register").post(accountController.register);
accountRouter.route("/user/registerChild").post(accountController.registerChild);
accountRouter.route("/user/changePassword").put(accountController.changePassword);
accountRouter.route("/user/login").post(accountController.login);
accountRouter.route("/user/childrenAccount").get(accountController.getChildrenAccountsByPhone);
accountRouter.route("/user/account").get(accountController.getAccountById);
accountRouter.route("/user/parentAccount").get(accountController.getParentAccountByPhone);
accountRouter.route("/user/checkPhone").get(accountController.checkPhoneExisted);

module.exports = accountRouter;
