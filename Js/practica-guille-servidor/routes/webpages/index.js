const express = require("express");
const webpagesController = require("../../controllers/webpages");
const { checkLoggedIn } = require("../../middlewares/auth");
const { checkAccessActionUser } = require("../../middlewares/user");
const {
  paramsValidation,
  existsValidation,
} = require("../../middlewares/validation");
const { checkAccessActionWebpage } = require("../../middlewares/webpage");
const router = express.Router();

// Create webpage
router.post(
  "/",
  checkLoggedIn,
  checkAccessActionWebpage("create"),
  webpagesController.createWebpage
);

// sin jwt
router.get("/", webpagesController.getAllWebpages);

// sin jwt
router.get(
  "/:webpageId",
  paramsValidation.validateParams(["webpageId"]),
  existsValidation.validateWebpageExists(),
  webpagesController.getWebpageById
);

router.put(
  "/:webpageId",
  checkLoggedIn,
  checkAccessActionWebpage("update"),
  paramsValidation.validateParams(["webpageId"]),
  existsValidation.validateWebpageExists(),
  webpagesController.updateWebpageById
);

// comentar profe endpoint debería seguir principios de Restful y ser /webpages/id/photos en vez de pasar id por body
router.post(
  "/:webpageId/photos",
  checkLoggedIn,
  checkAccessActionWebpage("update"),
  paramsValidation.validateParams(["webpageId"]),
  existsValidation.validateWebpageExists(),
  webpagesController.addPhotosToWebpageById
);

// comentar profe endpoint debería seguir principios de Restful y ser /webpages/id/texts en vez de pasar id por body
router.post(
  "/:webpageId/texts",
  checkLoggedIn,
  checkAccessActionWebpage("update"),
  paramsValidation.validateParams(["webpageId"]),
  existsValidation.validateWebpageExists(),
  webpagesController.addTextsToWebpageById
);

router.delete(
  "/:webpageId",
  checkLoggedIn,
  checkAccessActionWebpage("delete"),
  paramsValidation.validateParams(["webpageId"]),
  existsValidation.validateWebpageExists(),
  webpagesController.deleteWebpageById
);

// sin jwt
router.get(
  "/search/:city",
  paramsValidation.validateParams(["city"]),
  existsValidation.validateWebpageExists(),
  webpagesController.getWebpagesByCity
);

// sin jwt
router.get(
  "/search/:city/:activity",
  paramsValidation.validateParams(["city", "activity"]),
  existsValidation.validateWebpageExists(),
  webpagesController.getWebpagesByCityAndActivity
);

router.patch(
  "/:webpageId",
  checkLoggedIn,
  checkAccessActionWebpage("update"),
  paramsValidation.validateParams(["webpageId"]),
  existsValidation.validateWebpageExists(),
  webpagesController.updateScoreAndReviewToWebpageById
);

module.exports = router;
