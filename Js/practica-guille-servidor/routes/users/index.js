const express = require("express");
const usersController = require("../../controllers/users");
const { checkLoggedIn } = require("../../middlewares/auth");
const { checkAccessActionUser } = require("../../middlewares/user");
const {
  paramsValidation,
  existsValidation,
} = require("../../middlewares/validation");
const { validateParams } = require("../../middlewares/validation/params");
const router = express.Router();

router.get("/:city", validateParams(["city"]), usersController.getUsersByCity);

router.put("/:userId", usersController.getUserById);

router.delete(
  "/:userId",
  checkLoggedIn,
  checkAccessActionUser("delete"),
  paramsValidation.validateParams(["userId"]),
  existsValidation.validateUserExists(),
  usersController.deleteUserById
);

module.exports = router;
