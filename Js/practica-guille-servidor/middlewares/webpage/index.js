const { MerchantModel, WebpageModel } = require("../../models");
const { roles } = require("../../roles");
const { REQUEST } = require("../../types");

exports.checkAccessActionWebpage = (action) => {
  return async (req, res, next) => {
    try {
      // check read any
      let permission = roles
        .can(res.locals.user.role)
        [`${action}Any`]("webpage");
      //   check read own
      if (!permission.granted) {
        permission = roles.can(res.locals.user.role)[`${action}Own`]("webpage");
        if (permission.granted) {
          try {
            const webpageId = req.params.webpageId;
            const webpage = await WebpageModel.findById(webpageId);
            const userId = res.locals.userId;
            const merchant = await MerchantModel.findOne({ userId });

            if (webpage.merchantId.toString() != merchant._id.toString()) {
              permission = { granted: false };
            }
          } catch (err) {
            res
              .status(REQUEST.INTERNAL_SERVER_ERROR)
              .json({ message: err.message });
          }
        }
      }

      if (permission.granted) {
        next();
      } else {
        res
          .status(REQUEST.FORBIDDEN)
          .json({ message: "you dont have permissions to do this action" });
      }
    } catch (err) {
      res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  };
};
