const express = require("express");
const merchantControllers = require("../../controllers/merchants");
const { checkLoggedIn } = require("../../middlewares/auth");
const { checkAccessActionMerchant } = require("../../middlewares/merchant");

const {
  paramsValidation,
  existsValidation,
} = require("../../middlewares/validation");
const router = express.Router();

// create merchant
router.post(
  "/",
  checkLoggedIn,
  checkAccessActionMerchant("create"),
  merchantControllers.createMerchant
);

// Get all merchants
router.get("/", merchantControllers.getAllMerchants);

// Get merchant
router.get(
  "/:merchantId",
  paramsValidation.validateParams(["merchantId"]),
  existsValidation.validateMerchantExists(),
  merchantControllers.getMerchantById
);

// Delete merchant
router.delete(
  "/:merchantId",
  paramsValidation.validateParams(["merchantId"]),
  existsValidation.validateMerchantExists(),
  merchantControllers.deleteMerchantById
);

// Update merchant
router.put(
  "/:merchantId",
  paramsValidation.validateParams(["merchantId"]),
  existsValidation.validateMerchantExists(),
  merchantControllers.updateMerchantById
);

module.exports = router;
