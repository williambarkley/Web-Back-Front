const { default: mongoose } = require("mongoose");
const { UserModel, WebpageModel, MerchantModel } = require("../../models");
const { REQUEST } = require("../../types");

exports.validateUserExists = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      if (!mongoose.isValidObjectId(userId)) {
        return res
          .status(REQUEST.BAD_REQUEST)
          .json({ message: `id is not valid` });
      }
      const user = await UserModel.findById(userId);
      if (user) {
        return next();
      }
      res.status(REQUEST.NOT_FOUND).json({ message: "user not found" });
    } catch (err) {
      res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  };
};

exports.validateWebpageExists = () => {
  return async (req, res, next) => {
    try {
      const { webpageId } = req.params;
      if (!mongoose.isValidObjectId(webpageId)) {
        return res
          .status(REQUEST.BAD_REQUEST)
          .json({ message: `id is not valid` });
      }
      const webpage = await WebpageModel.findById(webpageId);
      if (webpage) {
        return next();
      }
      res.status(REQUEST.NOT_FOUND).json({ message: "webpage not found" });
    } catch (err) {
      res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  };
};

exports.validateMerchantExists = () => {
  return async (req, res, next) => {
    try {
      const { merchantId } = req.params;
      if (!mongoose.isValidObjectId(merchantId)) {
        return res
          .status(REQUEST.BAD_REQUEST)
          .json({ message: `id is not valid` });
      }
      const merchant = await MerchantModel.findById(merchantId);
      if (merchant) {
        return next();
      }
      res.status(REQUEST.NOT_FOUND).json({ message: "merchant not found" });
    } catch (err) {
      res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  };
};
