const { MerchantModel } = require("../../models");
const { roles } = require("../../roles");
const { REQUEST } = require("../../types");

exports.checkAccessActionMerchant = (action) => {
  return async (req, res, next) => {
    console.log(res.locals.user.role);
    try {
      // check read any
      let permission = roles
        .can(res.locals.user.role)
        [`${action}Any`]("merchant");
      //   check read own
      if (!permission.granted) {
        permission = roles
          .can(res.locals.user.role)
          [`${action}Own`]("merchant");
        if (permission.granted) {
          try {
            const merchantId = req.params.merchantId;
            const merchant = await MerchantModel.findById(merchantId);
            const userId = res.locals.userId;

            if (userId != merchant.userId) {
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
